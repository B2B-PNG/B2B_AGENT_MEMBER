import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "@/axios";
import { useUserStore } from "@/zustand/useUserStore";
import { QUERY_KEYS } from "./query-keys";

const fetchListAgentHost = async (body: any) => {
    const res = await apiClient.post("user/GetListAgentHostNoAddByAgent", body);
    return res.data;
};

export const useListAgentHost = (filters?: {
    page?: number | null;
    pageSize?: number | null;
    strFilterCompanyName?: string | null;
    strFilterLocationCode?: string | null;
    intCateID?: string | null;

}) => {
    const user = useUserStore((state) => state.user);

    const page = filters?.page;
    const pageSize = filters?.pageSize;
    const query = useQuery({
        queryKey: [QUERY_KEYS.AGENT_HOST, filters],
        queryFn: () =>
            fetchListAgentHost({
                strCompanyGUID: user?.strCompanyGUID,
                strFilterCompanyName: filters?.strFilterCompanyName ?? null,
                strFilterLocationCode: filters?.strFilterLocationCode ?? null,
                intCateID: filters?.intCateID ?? null,
                intCurPage: page ?? null,
                intPageSize: pageSize ?? null,
                strOrder: null,
                tblsReturn: "[0]",
            }),
        enabled: !!user,
        placeholderData: keepPreviousData,
    });

    const listData = query.data?.[0] ?? [];
    const totalRecords = listData?.[0]?.intTotalRecords || 0;
    const totalPages = pageSize
        ? Math.ceil(totalRecords / pageSize)
        : 0;

    return {
        ahData: listData,
        totalRecords,
        totalPages,
        ahLoading: query.isLoading,
        ahError: query.isError,
    };
};