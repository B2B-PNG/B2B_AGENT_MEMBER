import Pagination from "@/components/pagination/pagination";
import { TableCore, type ColumnDef } from "@/components/table/table-core";
import { Banknote, Building2, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";

const CartView = () => {
    const [filters, setFilters] = useState({
        page: String(1),
        limit: String(50),
        nameAccount: "",
        idAccount: "",
        idSwift: "",
        addRess: "",
    });

    const colDefs: ColumnDef<any>[] = [
        {
            field: "index",
            headerName: "STT",
            render: (value) => <span className="text-gray-400 font-medium">{value}</span>
        },

        {
            field: "serviceName",
            headerName: "Tên dịch vụ",
            render: (_, row) => (
                <div className="space-y-0.5 py-1 text-xs">
                    <div className="flex items-center gap-2 text-[#004b91] font-semibold text-sm">
                        <Building2 size={14} className="text-[#4e6d9a]" />
                        <span className="uppercase tracking-tight">{row?.serviceName}</span>
                    </div>
                    {row.contactEmail && (
                        <div className="text-[11px] text-gray-400 italic ml-5">
                            {row?.contactEmail}
                        </div>
                    )}
                </div>
            ),
        },

        {
            field: "paymentStatus",
            headerName: "Thanh toán",
            render: (value) => {
                const isPaid = value === "paid";
                return (
                    <span className={`px-3 py-1 rounded-2xl text-[11px] font-medium ${isPaid
                        ? "bg-green-50 text-green-600 border border-green-100"
                        : "bg-orange-50 text-orange-600 border border-orange-100"
                        }`}>
                        {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                    </span>
                );
            },
        },

        {
            field: "quantity",
            headerName: "Số lượng",
            render: (value) => (
                <div className="flex justify-center min-w-[80px]">
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {value}
                    </span>
                </div>
            ),
        },

        {
            field: "totalPrice",
            headerName: "Tổng giá",
            render: (value) => (
                <div className="">
                    {new Intl.NumberFormat('vi-VN').format(value)}{" "}
                    <span className="text-[10px] align-top">đ</span>
                </div>
            ),
        },

        {
            field: "commission",
            headerName: "Hoa hồng",
            render: (value) => (
                <div className="flex items-center gap-1 text-orange-600">
                    <Banknote size={14} />
                    {value
                        ? `${new Intl.NumberFormat('vi-VN').format(value)} đ`
                        : "---"}
                </div>
            )
        },

        {
            field: "actions",
            headerName: "Thao tác",
            render: (_, row) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => console.log("Edit", row)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <Edit3 size={18} />
                    </button>
                    <button
                        onClick={() => console.log("Delete", row)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ),
        },
    ];

    const mockData = [
        {
            index: 1,
            serviceName: "Tour Hà Nội - Hạ Long 2N1Đ",
            contactEmail: "booking@itourlink.vn",
            paymentStatus: "unpaid",
            quantity: 2,
            totalPrice: 3500000,
            commission: 150000,
        },
        {
            index: 2,
            serviceName: "Tour Phú Quốc 3N2Đ",
            contactEmail: "sale@itourlink.vn",
            paymentStatus: "paid",
            quantity: 1,
            totalPrice: 5200000,
            commission: 300000,
        },
        {
            index: 3,
            serviceName: "Tour Đà Nẵng - Hội An",
            contactEmail: "support@itourlink.vn",
            paymentStatus: "unpaid",
            quantity: 4,
            totalPrice: 8400000,
            commission: 0,
        },
    ];

    const auditLog = {
        result: mockData,
        meta: {
            pageCount: 5,
        },
    };

    const alLoading = false;
    const alEmpty = false;

    return (
        <div className="max-w-5xl mx-auto ">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Giỏ hàng</h1>
                    <p className="text-gray-500 text-sm mt-1 font-normal">Kiểm tra danh sách dịch vụ và hoàn tất các bước để giữ chỗ ngay hôm nay.</p>
                </div>
            </div>

            <div className="mt-4"></div>
            <TableCore
                rowData={auditLog?.result ?? []}
                columnDefs={colDefs}
                loading={alLoading}
            />

            {!alEmpty && (
                <Pagination
                    currentPage={Number(filters.page)}
                    onPageChange={(value) => {
                        setFilters({
                            ...filters,
                            page: String(value),
                        });
                    }}
                    totalPages={Number(auditLog?.meta?.pageCount)}
                />
            )}

        </div>
    )
}

export default CartView