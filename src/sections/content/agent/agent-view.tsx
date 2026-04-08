import PrimaryButton from "@/components/button/primary-button";
import CustomFilter from "@/components/form/custom-filter"
import { Building2, RotateCcw, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { TableCore, type ColumnDef } from "@/components/table/table-core";
import Pagination from "@/components/pagination/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useListCompanyOwner } from "@/hooks/actions/useUser";
import { QUERY_KEYS } from "@/hooks/actions/query-keys";
import { useUserStore } from "@/zustand/useUserStore";
import type { IAgent } from "@/hooks/interfaces/user";

const AgentView = () => {
    const user = useUserStore((state) => state.user);
    const [filters, setFilters] = useState({
        page: String(1),
        limit: String(50),
        nameProvider: "",
    });

    const [page, setPage] = useState(1);
    const pageSize = 5;
    const { data, isError, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.USER.LIST_COMPANY_OWNER, page],
        queryFn: () =>
            useListCompanyOwner({
                strUserPartnerGUID: user?.strUserGUID,
                strCompanyPartnerGUID: user?.strCompanyGUID,
                strCompanyOwnerGUID: null,
                intCurPage: page,
                intPageSize: pageSize,
                strOrder: null,
                strFilterCompanyName: null,
                strCompanyNameUrl: null,
                IsOwnerFriend: true,
                tblsReturn: "[0]"
            }),
        placeholderData: keepPreviousData,
    });
    const listData = data?.[0] ?? [];
    const totalRecords = listData?.[0]?.intTotalRecords || 0;
    const totalPages = Math.ceil(totalRecords / pageSize);

    useEffect(() => {
        if (page > totalPages) {
            setPage(1);
        }
    }, [totalPages]);

    const onChangeFilters = (key: string, value: string | number) => {
        let newValue = value;

        if (key === "startTime" && value) {
            const date = new Date(Number(value));
            date.setUTCHours(0, 0, 0, 0);
            newValue = date.getTime();
        }

        if (key === "endTime" && value) {
            const date = new Date(Number(value));
            date.setUTCHours(23, 59, 59, 999);
            newValue = date.getTime();
        }

        setFilters((prev) => ({
            ...prev,
            [key]: String(newValue),
            page: String(1),
        }));
    };

    const handleSearch = () => {
        setFilters((prev) => ({
            ...prev,
            page: "1",
        }));
    };

    const handleReset = () => {
        setFilters({
            page: "1",
            limit: "50",
            nameProvider: "",
        });
    };




    const colDefs: ColumnDef<IAgent>[] = [
        {
            field: "No",
            headerName: "STT",
            render: (value) => <span className="text-gray-400 font-medium">{value}</span>,
        },
        {
            field: "strCompanyName",
            headerName: "Tên công ty",
            render: (_, row) => (
                <div className="space-y-0.5 py-1 text-xs">
                    <div className="flex items-center gap-2 text-[#004b91] font-semibold text-sm">
                        <Building2 size={14} className="text-[#4e6d9a]" />
                        <span className="uppercase tracking-tight">{row?.strCompanyName}</span>
                    </div>
                </div>
            ),
        },
        {
            field: "No",
            headerName: "Thao tác",
            render: (_, row) => (
                <div className="flex items-center gap-2 min-w-[150px]">
                    <button
                        onClick={() => console.log('Tariff', row)}
                        className="px-4 py-1.5 bg-[#004b91] text-white text-[13px] font-medium rounded hover:bg-[#003d76] transition-all shadow-sm"
                    >
                        Tariff
                    </button>
                    <button
                        onClick={() => console.log('Shop', row)}
                        className="px-4 py-1.5 bg-[#004b91] text-white text-[13px] font-medium rounded hover:bg-[#003d76] transition-all shadow-sm"
                    >
                        Shop
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-end gap-3">

                <CustomFilter
                    onChangeFilters={onChangeFilters}
                    search={[
                        {
                            keySearch: "nameProvider",
                            value: filters.nameProvider,
                            placeHoder: "Tên đại lý",
                        },
                    ]}
                />

                <div className="flex gap-2 mt-3">
                    <PrimaryButton
                        text="Tìm kiếm"
                        onClick={handleSearch}
                        className="bg-[#4e6d9a] hover:bg-[#3d567a] rounded-lg px-4 py-2 text-sm w-fit"
                        prefixIcon={<Search size={18} />}
                    />

                    <PrimaryButton
                        text="Reset"
                        onClick={handleReset}
                        className="bg-gray-200 hover:bg-gray-300 text-black rounded-lg px-4 py-2 text-sm w-fit"
                        prefixIcon={<RotateCcw size={18} />}
                    />
                </div>
            </div>

            <div className="pt-4">
                <TableCore
                    rowData={listData ?? []}
                    columnDefs={colDefs}
                    loading={isLoading}
                />

                {!isError && (
                    <Pagination
                        currentPage={page}
                        onPageChange={(value) => setPage(value)}
                        totalPages={totalPages || 1}
                    />
                )}
            </div>
        </div>
    )
}

export default AgentView