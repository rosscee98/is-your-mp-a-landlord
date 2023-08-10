import getInterests from "./getInterests";
import getMemberId from "./getMemberId";

export default async function getLandlordInterests(postcode: string) {
  return await getMemberId(postcode)
    .then(getInterests)
    .then((interests) =>
      interests.filter(
        ({ name }) =>
          name ===
          "6. Land and property portfolio: (i) value over £100,000 and/or (ii) giving rental income of over £10,000 a year"
      )
    );
}
