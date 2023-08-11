interface Response {
  items: [
    {
      value: {
        currentRepresentation: {
          member: {
            value: {
              id: number;
              nameDisplayAs: string;
              thumbnailUrl: string;
            };
          };
        };
      };
    }
  ];
}

export default async function getMember(postcode: string) {
  const endpoint = new URL(
    "https://members-api.parliament.uk/api/Location/Constituency/Search"
  );
  endpoint.searchParams.append("searchText", postcode);

  return await fetch(endpoint)
    .then((res) => res.json())
    .then((body: Response) => {
      const {
        id,
        nameDisplayAs: name,
        thumbnailUrl,
      } = body.items[0].value.currentRepresentation.member.value;
      return { id, name, thumbnailUrl };
    });
}
