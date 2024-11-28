import { getFestivalDetails } from "./festival-details"
export const getMusicFestivalDetails = async():Promise<any>=>{
    return await getFestivalDetails();
}

getMusicFestivalDetails().then(festival =>
   console.log(festival, 'festival')
)