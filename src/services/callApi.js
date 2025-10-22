import axios from "axios";



const API_KEY = import.meta.env.VITE_HARVARD_API_KEY;
const URL = "https://api.harvardartmuseums.org/object"

export const randomArt = async () => {
    try { 
        const query = await axios.get(URL, {params: { 
            apikey: API_KEY,
            size: 1,
            sort: 'random',
            hasimage: 1, 
            fields: 'title,people,primaryimageurl,description'
        }});

        return query.data.records[0]

    } catch {
        console.log("Could not get response")
        return null
    }

    

}