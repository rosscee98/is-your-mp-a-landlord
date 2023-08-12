export const mockThumbnailUrl = "https://test.com/";

export const mockMemberResponse = {
  items: [
    {
      value: {
        name: "Ilford South",
        currentRepresentation: {
          member: {
            value: {
              id: "id",
              nameDisplayAs: "Mike Gapes",
              thumbnailUrl: mockThumbnailUrl,
            },
          },
        },
      },
    },
  ],
};

export const mockLandlordInterestsResponse = {
  value: [
    {
      name: "6. Land and property portfolio: (i) value over £100,000 and/or (ii) giving rental income of over £10,000 a year",
      interests: [{ interest: "interest1" }, { interest: "interest2" }],
    },
  ],
};

export const mockNonLandlordInterestsResponse = {
  value: [
    {
      name: "non-landlordy things",
      interests: [{ interest: "interest1" }, { interest: "interest2" }],
    },
  ],
};
