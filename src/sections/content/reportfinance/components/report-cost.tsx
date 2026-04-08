import PrimaryButton from "@/components/button/primary-button";
import CustomFilter from "@/components/form/custom-filter"
import { Building2, Calendar, FolderOpen, RotateCcw, Search } from "lucide-react";
import { useEffect, useState } from "react";
import SummaryBadge from "./summary-badge";
import { TableCore, type ColumnDef } from "@/components/table/table-core";
import Pagination from "@/components/pagination/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/hooks/actions/query-keys";
import { useReportPayableBookingItemByAgent } from "@/hooks/actions/useUser";
import { useUserStore } from "@/zustand/useUserStore";
import type { IReportCost } from "@/hooks/interfaces/user";
import { fDateTime } from "@/utils/format-time";

const ReportCost = () => {
    const user = useUserStore((state) => state.user);
    const [filters, setFilters] = useState({
        page: String(1),
        limit: String(50),
        startTime: "",
        endTime: "",
        nameProvider: "",
        idOrder: "",
        nameGroup: ""
    });

    const [page, setPage] = useState(1);
    const pageSize = 5;
    const { data, isLoading, isError } = useQuery({
        queryKey: [QUERY_KEYS.USER.LIST_REPORT_PAYABLE_BOOKING_ITEM_BY_AGENT, page],
        queryFn: () =>
            useReportPayableBookingItemByAgent({
                strPayableBookingItemGUID: null,
                strCompanyGUID: user?.strCompanyGUID,
                strFilterAgentHostName: null,
                strFilterOrderBookingCode: null,
                strFilterGroupName: null,
                dtmFilterDateFrom: null,
                dtmFilterDateTo: null,
                intCurPage: page,
                intPageSize: pageSize,
                strOrder: null,
                tblsReturn: "[0]"

            }),
        placeholderData: keepPreviousData,
    });
    const listData = data?.[0] ?? [];
    const totalRecords = listData?.[0]?.intTotalRecords || 0;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const dblSumPayableAmount = listData?.[0]?.dblSumPayableAmount || 0;

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
            startTime: "",
            endTime: "",
            nameProvider: "",
            idOrder: "",
            nameGroup: ""
        });
    };


    const colDefs: ColumnDef<IReportCost>[] = [
        {
            field: "No",
            headerName: "STT",
            render: (value) => <span className="text-gray-400 font-medium">{value}</span>,
        },
        {
            field: "strAgentHostName",
            headerName: "Tên máy chủ đại lý",
            render: (value) => (
                <div className="space-y-0.5 py-1 min-w-50 text-xs">
                    <div className="flex items-center gap-2 text-[#004b91] font-semibold text-sm">
                        <Building2 size={14} className="text-[#4e6d9a]" />
                        <span className="uppercase tracking-tight">{value}</span>
                    </div>
                </div>
            ),
        },
        {
            field: "No",
            headerName: "Mã đặt chỗ/Tên nhóm",
            render: (_, row) => (
                <div className="min-w-full">
                    <div className="text-[#004b91] font-medium text-sm hover:underline cursor-pointer">
                        {row.strOrderBookingCode}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-[11px] mt-1">
                        <FolderOpen size={12} className="text-blue-400" />
                        {row.strGroupName}
                    </div>
                </div>
            ),
        },
        {
            field: "strPaymentBookingPeriodCode",
            headerName: "Mã tiền gửi",
            render: (value) => (
                <span className="text-xs font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                    {value || "---"}
                </span>
            )
        },
        {
            field: "No",
            headerName: "Ngày Từ - Ngày Đến",
            render: (_, row) => (
                <div className="text-xs text-gray-600 flex items-center gap-1.5 min-w-[180px]">
                    <Calendar size={13} className="text-gray-400" />
                    <span>{fDateTime(row.dtmDateFrom)} - {fDateTime(row.dtmDateTo)}</span>
                </div>
            ),
        },
        {
            field: "dblPayableAmount",
            headerName: "Giá phải trả",
            render: (value) => (
                <div className={`${value > 0 ? "text-red-500" : "text-green-600"} min-w-[100px]`}>
                    {new Intl.NumberFormat('vi-VN').format(
                        Number.isFinite(Number(value)) ? Number(value) : 0
                    )}{" "}
                    <span className="text-[10px] align-top">đ</span>
                </div>
            ),
        },
    ];

    return (
        <div>
            <CustomFilter
                onChangeFilters={onChangeFilters}
                search={[
                    {
                        keySearch: "idRequest",
                        value: filters.nameProvider,
                        placeHoder: "Tên nhà cung cấp",
                    },
                    {
                        keySearch: "idRequest",
                        value: filters.idOrder,
                        placeHoder: "Mã đặt",
                    }, {
                        keySearch: "idRequest",
                        value: filters.nameGroup,
                        placeHoder: "Tên Nhóm",
                    },
                ]}
                time={{
                    keyStartTime: "startTime",
                    keyendTime: "endTime",
                    startTime: Number(filters.startTime),
                    endTime: Number(filters.endTime),
                }}

            />

            <div className="flex items-end justify-between">

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

                <SummaryBadge label="Tổng chi phí" value={dblSumPayableAmount} />

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

export default ReportCost