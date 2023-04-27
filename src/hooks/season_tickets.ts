import { useMutation, useQuery } from '@tanstack/react-query';
import { createSeasonTicket, getSeasonTickets } from '@/api/season_tickets';

const key = 'season_tickets';

export function useSeasonTickets() {
  return useQuery([key], getSeasonTickets);
}

export function useMutationCreateSeasonTicket() {
  return useMutation([key], createSeasonTicket);
}
