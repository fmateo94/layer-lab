import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const WIKIDATA_SPARQL = `
SELECT DISTINCT ?perfume ?perfumeLabel ?brandLabel ?noteLabel WHERE {
  { ?perfume wdt:P31 wd:Q131746. } UNION { ?perfume wdt:P31 wd:Q2863. } # perfume or eau de cologne
  OPTIONAL { ?perfume wdt:P176 ?brand. ?brand rdfs:label ?brandLabel. FILTER(LANG(?brandLabel) = "en") }
  OPTIONAL { ?perfume wdt:P5872 ?note. ?note rdfs:label ?noteLabel. FILTER(LANG(?noteLabel) = "en") }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 300
`

async function run() {
    console.log('Starting ingestion from Wikidata...')

    const url = "https://query.wikidata.org/sparql";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/sparql-results+json",
            "User-Agent": "LayerLab/1.0 (https://layerlab.app)"
        },
        body: `query=${encodeURIComponent(WIKIDATA_SPARQL)}`
    });

    if (!response.ok) {
        throw new Error(`Wikidata query failed: ${response.statusText}`);
    }

    const data = await response.json();
    const bindings = data.results.bindings;
    console.log(`Fetched ${bindings.length} results from Wikidata`);

    // Simple ingestion logic
    for (const binding of bindings) {
        const name = binding.perfumeLabel.value;
        const brandName = binding.brandLabel?.value || 'Unknown Brand';
        const noteName = binding.noteLabel?.value;

        // 1. Ensure brand exists
        const { data: brand } = await supabase
            .from('brands')
            .upsert({ name: brandName })
            .select()
            .single();

        if (!brand) continue;

        // 2. Ensure fragrance exists
        const { data: fragrance } = await supabase
            .from('fragrances')
            .upsert({
                name,
                brand_id: brand.id,
                concentration: 'EDP' // Default
            }, { onConflict: 'brand_id,name' })
            .select()
            .single();

        if (!fragrance) continue;

        // 3. Ensure note exists and link it
        if (noteName) {
            const { data: note } = await supabase
                .from('notes')
                .upsert({ name: noteName })
                .select()
                .single();

            if (note) {
                await supabase
                    .from('fragrance_notes')
                    .upsert({
                        fragrance_id: fragrance.id,
                        note_id: note.id,
                        layer: 'unknown'
                    }, { onConflict: 'fragrance_id,note_id,layer' });
            }
        }
    }

    console.log('Ingestion complete!');
}

run().catch(console.error);
