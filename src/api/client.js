export async function getLandsByAddressOrEns() {
  return fetch("http://localhost:4000/nfts");
}
