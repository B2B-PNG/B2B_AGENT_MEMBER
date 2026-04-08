import { TableCore, type ColumnDef } from "@/components/table/table-core";
import { QUERY_KEYS } from "@/hooks/actions/query-keys";
import { useListPaidBooking } from "@/hooks/actions/useUser";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
    item: any;
    itemCard: any;
}

const ListPaid = ({ item, itemCard }: Props) => {
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const { data, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.USER.LIST_PAID_BOOKING, page],
        queryFn: () =>
            useListPaidBooking({
                strAgentHostServiceItemGUID: item?.id,
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

    const colDefs: ColumnDef<any>[] = [
        {
            field: "stt",
            headerName: "STT",
            render: (value) => (
                <span className="text-gray-400 font-medium">{value}</span>
            )
        },

        {
            field: "payable",
            headerName: "Payable",
            render: (value) => (
                <div className="font-semibold text-gray-800 min-w-[100px]">
                    {new Intl.NumberFormat('vi-VN').format(value)}{" "}
                    <span className="text-[10px] align-top">đ</span>
                </div>
            )
        },

        {
            field: "deadline",
            headerName: "Deadline",
            render: (value) => (
                <div className="text-xs text-gray-500 flex items-center justify-center gap-1.5 min-w-[170px]">
                    <Calendar size={13} className="text-gray-400" />
                    {value}
                </div>
            )
        },

        {
            field: "createDate",
            headerName: "Create Date",
            render: (value) => (
                <div className="text-xs text-gray-500 flex items-center justify-center gap-1.5 min-w-[170px]">
                    <Calendar size={13} className="text-gray-400" />
                    {value}
                </div>
            )
        },

        {
            field: "paymentMethod",
            headerName: "Payment Method",
            render: (value) => (
                <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {value}
                </span>
            )
        },
    ];

    return (
        <div>

            <div className="flex justify-between items-center mb-6">
                <div className="space-y-1">
                    <div className="text-xs text-gray-400 font-medium uppercase">Service Name</div>
                    <div className="text-[15px] text-gray-800 font-semibold uppercase tracking-tight">
                        {itemCard?.strServiceName}
                    </div>
                </div>


                <div className="space-y-1">
                    <div className="text-xs text-gray-400 font-medium uppercase">Agent host</div>
                    <div className="text-[15px] text-gray-800 font-semibold uppercase tracking-tight">
                        {itemCard?.strAgentHostName}
                    </div>
                </div>

            </div>
            <div className="">
                <TableCore
                    rowData={listData ?? []}
                    columnDefs={colDefs}
                    loading={isLoading}
                />
            </div>
        </div>
    )
}

export default ListPaid