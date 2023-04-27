import axios from '@/lib/axios';

export const getSeasonTickets = async () => {
  const { data } = await axios.get(`/season-tickets/`);
  return data;
};

export const createSeasonTicket = async (season_ticket: any) => {
  const { data } = await axios.post(`/season-tickets/`, season_ticket);

  return data;
};
