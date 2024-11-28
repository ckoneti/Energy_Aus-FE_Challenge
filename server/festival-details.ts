import axios, { AxiosResponse } from "axios";
export async function getFestivalDetails(): Promise<any> {
    let festivalMap: Map<string, { bandName: string; festival: string | null }[]> = new Map();
    try {
        const festivalDetails:AxiosResponse = await axios.get('https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals'); // call the api
        if (festivalDetails.data.length > 0 && Array.isArray(festivalDetails)) {
             festivalDetails.forEach(festivalDetails => {
                let festivalName = festivalDetails.name || null
                festivalDetails.bands.forEach(band => {
                    if (band.recordLabel != '' && band.recordLabel) {
                        if (!festivalMap.has(band.recordLabel)) {
                            festivalMap.set(band.recordLabel, []);
                        }
                        
                            festivalMap.get(band.recordLabel)!.push({
                                bandName: band.name,
                                festival: festivalName,
                              }) 
                        
                    }
                })
            })
        }
        else {
            throw new Error('Unable to connect with the API')
        }
        return Array.from(festivalMap.entries())
        .map(([recordLabel,bands]) => ({
          recordLabel,
          bands: bands.sort((a, b) => a.bandName.localeCompare(b.bandName)), // Sort bands alphabetically
        }))
        .sort((a, b) => a.recordLabel.localeCompare(b.recordLabel)); // Sort record labels alphabetically
    }
    catch (e) {
        console.log('There is an error connecting with the api',e)
    }
    console.log(festivalMap, 'festivalMap')
}
getFestivalDetails();