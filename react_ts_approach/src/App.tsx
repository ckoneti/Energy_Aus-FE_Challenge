import { useEffect, useState } from "react"
import { RecordLabelData, FestivalDetails } from "../types"
import axios, { AxiosResponse } from 'axios'

export default function App() {
  const festivalMap: Map<string, { bandName: string; festival: string | null }[]> = new Map();
  const [festivalRecords, setFestivalRecords] = useState<RecordLabelData[]>([])
  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const response: AxiosResponse = await axios.get<FestivalDetails[]>(
          "https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals", 
          {
            headers: {
                'Access-Control-Allow-Origin': '*', // Optional - but this is usually set by the server
                'Content-Type': 'application/json',
            }
          }

        );
        const formattedData = getSortedData(response.data); // pass the api response to retrieve the data in format
        setFestivalRecords(formattedData);
      } catch (err) {
        console.log('error in calling the apis', err)
      }
    };
    fetchFestivals();
  }, []);
  function getSortedData(festivalDetails: FestivalDetails[]): RecordLabelData[] {
    festivalDetails.forEach(festivalDetails => {  // iterating over the array
      const festivalName = festivalDetails.name || null
      festivalDetails.bands.forEach(band => {
        if (band.recordLabel != '' && band.recordLabel) {
          if (!festivalMap.has(band.recordLabel)) {  //  collect the data via map
            festivalMap.set(band.recordLabel, []);
          }
          festivalMap.get(band.recordLabel)!.push({
            bandName: band.name,
            festival: festivalName,
          })

        }
      })
    })
    return Array.from(festivalMap.entries())  // convert the map to array
      .map(([recordLabel, bands]) => ({
        recordLabel,
        bands: bands.sort((a, b) => a.bandName.localeCompare(b.bandName)), // Sort bands names alphabetically
      }))
      .sort((a, b) => a.recordLabel.localeCompare(b.recordLabel)); // Sort record labels alphabetically 
  }

  return ( 
    <>
      <h1>Record Labels and Bands</h1>
      {festivalRecords.map(({ recordLabel, bands }) => (
        <div key={recordLabel}>
          <h2>{recordLabel}</h2>
          {bands.map((band, index) => (
            <div key={index} style={{ marginLeft: "20px" }}>
              <p><strong>BandName :</strong>{band.bandName}</p>
              <p style={{ marginLeft: "20px" }}> <strong> Festival:</strong>{band.festival || "No Festival"}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};  // relay the data back to frontend





