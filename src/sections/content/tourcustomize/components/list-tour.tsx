import { useState } from "react";
import { 
  MapPin, Plus, ChevronsUpDown, Menu, Trash2, ChevronDown, RefreshCw, 
  Bed, Landmark, Car, Pencil, PlusCircle, Image as ImageIcon 
} from "lucide-react";
import ServiceMenu, { type IServiceMenuItem } from "./service-menu";

const MENU_ITEMS: IServiceMenuItem[] = [
  { icon: <Bed size={20} />, label: 'Thêm chỗ nghỉ', value: 'accommodation', color: 'text-blue-700' },
  { icon: <Landmark size={20} />, label: 'Thêm Chuyến Tham quan', value: 'excursion', color: 'text-blue-700' },
  { icon: <Car size={20} />, label: 'Thêm Dịch vụ Vận chuyển', value: 'transport', color: 'text-blue-700' },
  { icon: <Pencil size={20} />, label: 'Thêm Thủ Công', value: 'manual', color: 'text-blue-700' },
  { icon: <PlusCircle size={20} />, label: 'Thêm Dịch Vụ Đơn', value: 'single_service', color: 'text-blue-700' },
  { icon: <ImageIcon size={20} />, label: 'Add Image', value: 'image', color: 'text-blue-700' },
];

interface Props {
  onChange: (value: string) => void;
}

const ListTour = ({ onChange }: Props) => {
  const [showMenu, setShowMenu] = useState(false);  
  // Mock data based on the screenshot
  const tours = [
    {
      id: "2",
      service: "HÀ NỘI - HẠ LONG - VỊNH NGỌC XANH",
      type: "Excursion",
      days: 1,
      quantity: "11 Adult(s);",
      price: 11597600,
      pricePerPax: 11597600,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Ha_Long_Bay_Vietnam.jpg/640px-Ha_Long_Bay_Vietnam.jpg",
    }
  ];

  return (
    <div className="w-full bg-white font-sans">
      {/* 1. Header: Ngày 1 + Enter day name
      <div className="flex items-center gap-6 px-4 py-3">
        <div className="bg-[#4a83d4] text-white px-3 py-1 rounded-sm text-[18px] font-semibold">
          Ngày 1
        </div>
        <div className="text-[20px] text-gray-400 font-medium italic">
          Enter day name
        </div>
      </div> */}

      {/* 2. Action Icons Row */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <div className="flex items-center gap-4 text-gray-700">
          <MapPin size={20} className="fill-current" />
          <Plus size={20} className="stroke-[3]" />
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#e9f2ff] text-[#4a83d4] p-1.5 rounded-md cursor-pointer hover:bg-[#d0e4ff] transition-colors">
            <ChevronsUpDown size={18} />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            >
              <Menu size={20} />
            </button>

            {/* Popup Menu */}
            {showMenu && (
              <div className="absolute left-[-200px] top-full mt-2 z-50">
                <ServiceMenu 
                  items={MENU_ITEMS}
                  onChange={(value) => {
                    console.log("Selected service value:", value);
                    // Logic mở popup tương ứng
                    if (value === 'accommodation') {
                       // openHotelPopup();
                    }
                    onChange(value); // Báo lên Ông nội (DetailTourContent)
                    setShowMenu(false);
                  }} 
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Data Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-[12px] text-gray-500 font-medium border-b border-gray-100 uppercase tracking-tight">
              <th className="px-4 py-3 text-left w-12 font-normal">STT</th>
              <th className="px-4 py-3 text-left w-24 font-normal">Image</th>
              <th className="px-4 py-3 text-left font-normal uppercase">Service</th>
              <th className="px-4 py-3 text-left font-normal uppercase">Description</th>
              <th className="px-4 py-3 text-left font-normal uppercase">No Of Days</th>
              <th className="px-4 py-3 text-left font-normal uppercase">Quantity</th>
              <th className="px-4 py-3 text-right font-normal uppercase">Price</th>
              <th className="px-4 py-3 text-right font-normal uppercase">Price per pax</th>
              <th className="px-4 py-3 text-center w-20 font-normal uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {/* Category Row: Night */}
            <tr className="bg-[#e0f1f5]">
              <td colSpan={9} className="px-4 py-2 text-[13px] font-bold text-gray-600">
                Night
              </td>
            </tr>

            {/* Data Row */}
            {tours.map((tour) => (
              <tr key={tour.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                <td className="px-4 py-4 text-[13px] text-gray-600">{tour.id}</td>
                <td className="px-4 py-4">
                  <div className="w-[100px] h-[60px] rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                    <img
                      src={tour.image}
                      alt={tour.service}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#333] uppercase tracking-tight">
                        {tour.service}
                      </span>
                      <RefreshCw size={14} className="text-[#0057a8] rotate-90" />
                    </div>
                    <div className="text-[12px] text-gray-500">
                      ({tour.type})
                    </div>
                    {/* Star Rating Box */}
                    <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 w-fit bg-white cursor-pointer hover:border-gray-400 transition-colors">
                      <div className="flex text-[#333]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className="text-[10px]">★</span>
                        ))}
                      </div>
                      <ChevronDown size={14} className="text-gray-400" />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-blue-500 cursor-pointer hover:text-blue-700">
                    <Plus size={18} strokeWidth={3} />
                  </div>
                </td>
                <td className="px-4 py-4 text-[13px] text-gray-700 font-medium">
                  {tour.days}
                </td>
                <td className="px-4 py-4 text-[13px] text-gray-700">
                  {tour.quantity}
                </td>
                <td className="px-4 py-4 text-[14px] text-gray-800 font-bold text-right">
                  ₫{tour.price.toLocaleString()}
                </td>
                <td className="px-4 py-4 text-[14px] text-gray-800 font-bold text-right">
                  ₫{tour.pricePerPax.toLocaleString()}
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-center">
                    <button className="bg-[#f2f4f7] p-2 rounded-md hover:bg-red-50 hover:text-red-600 transition-all text-gray-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTour;