export default async function getInterests(memberId: number) {
  return await fetch(
    `https://members-api.parliament.uk/api/Members/${memberId}/RegisteredInterests`
  )
    .then((res) => res.json())
    .then((body) => body.value);
}
