export default async function getMember(postcode: string) {
  const endpoint = new URL(
    "https://members-api.parliament.uk/api/Location/Constituency/Search"
  );
  endpoint.searchParams.append("searchText", postcode);

  return await fetch(endpoint)
    .then((res) => res.json())
    .then((body) => body.items[0].value.currentRepresentation.member.value);
}
