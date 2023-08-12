import getInterests from "./getInterests";
import getMember from "./getMember";

export default async function getLandlordInterests(postcode: string) {
  const member = await getMember(postcode);
  const landlordInterests = await getInterests(member.id).then(
    (entries) =>
      entries
        .find(
          ({ name }) =>
            name ===
            "6. Land and property portfolio: (i) value over £100,000 and/or (ii) giving rental income of over £10,000 a year"
        )
        ?.interests.map(({ interest }) => interest)
        .filter((interest) => interest.includes("(ii)"))
        .map((interest) => interest.split(":")[0]) ?? []
  );

  return { ...member, landlordInterests };
}
