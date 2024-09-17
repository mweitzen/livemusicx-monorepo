export const schema = {
  userId: 123,
  preferences: {
    email: {
      enabled: true,
      frequency: 'daily',
    },
    sms: {
      enabled: false,
      frequency: 'none',
    },
    push: {
      frequency: 'weekly',
      enabled: true,
    },
    notificationsFor: {
      venues: ['venueId1', 'venueId2'],
      musicians: ['musicianId1'],
    },
  },
};
