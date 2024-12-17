import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IGlobalStore {
	baseProductIds: string[];
	handleSetBaseProducts: (ids: string[]) => void;
}

export const useBaseProductIds = create<IGlobalStore>()(
	persist(
		(set) => ({
			baseProductIds: [],
			handleSetBaseProducts: (ids: string[]) =>
				set((state) => ({ baseProductIds: ids })),
		}),
		{
			name: 'base-product-ids-store',
			storage: createJSONStorage(() => localStorage),
		}
	)
);
