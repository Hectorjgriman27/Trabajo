import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getEventsCategories,
  createEventCategory,
  readEventCategory,
  updateEventCategory,
  deleteEventCategory,
} from '@/api/event/event_category';
import { WithDocs } from '@/interfaces/serializers/commons';
import { EventCategory } from '@/interfaces/event';

const key = 'event_category';

export function useCategories() {
  return useQuery([key], getEventsCategories);
}

export function useMutationCreateEventCategory() {
  const queryClient = useQueryClient();

  return useMutation(createEventCategory, {
    onSuccess: (event_category) => {
      queryClient.setQueryData([key], (prevEventCategory: any) =>
        prevEventCategory.concat(event_category)
      );
      queryClient.invalidateQueries([key]);
    },
  });
}

export function useEventCategories() {
  return useQuery<EventCategory[]>([key], getEventsCategories);
}

export function useEventCategory(category_id: string) {
  return useQuery<EventCategory>([key, category_id], () =>
    readEventCategory(category_id)
  );
}
