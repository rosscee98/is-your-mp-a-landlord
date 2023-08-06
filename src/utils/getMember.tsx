export default async function getMember(postcode: string) {
  return await fetch(
    `https://members-api.parliament.uk/api/Location/Constituency/Search?searchText=${encodeURI(
      postcode
    )}`
  )
    .then((res) => res.json())
    .then((body) => body.items[0].value.currentRepresentation.member.value);
}
