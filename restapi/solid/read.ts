import {
    getSolidDataset,
    getThing,
    getStringNoLocale,
  } from "@inrupt/solid-client";
  
import { VCARD } from "@inrupt/vocab-common-rdf";
 
export async function read() {
    const myDataset = await getSolidDataset(
    "https://sergiomalv.inrupt.net/profile/card", {
    fetch: fetch
  });

  const profile = getThing(myDataset, "https://sergiomalv.inrupt.net/profile/card#me")
  const addressWebID = profile!.predicates["http://www.w3.org/2006/vcard/ns#hasAddress"]["namedNodes"]
  const idAddress = addressWebID![0].split('#')[1]
    
   
   const getAddress = getThing(myDataset, "https://sergiomalv.inrupt.net/profile/card#" + idAddress);
   const address = getStringNoLocale(getAddress!, VCARD.street_address);
}

