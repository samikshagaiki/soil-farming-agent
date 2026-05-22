import Distributor from "@/models/Distributor";

export async function getNearbyDistributors(
  city
) {

  const distributors =
    await Distributor.find({
      city: city.toLowerCase()
    });

  return distributors;
}