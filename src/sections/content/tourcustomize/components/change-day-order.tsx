import { GripHorizontal, MapPin, Trash2, Plus, RefreshCw, X } from "lucide-react";

interface ChangeDayOrderProps {
  onClose: () => void;
}

const ChangeDayOrder = ({ onClose }: ChangeDayOrderProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="w-full max-w-[1020px] overflow-hidden rounded-[18px] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-[18px] font-semibold text-[#3a3a3a]">
            Change Day Order
          </h2>

          <button 
            onClick={onClose}
            className="text-gray-300 transition hover:text-gray-500 cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <div className="rounded-sm bg-[#efefef] px-4 py-5">
            <div className="flex items-center justify-between gap-4">
              {/* Left content */}
              <div className="flex min-w-0 items-center gap-3">
                <button className="shrink-0 text-[#3d3d3d]">
                  <GripHorizontal size={20} />
                </button>

                <div className="min-w-0">
                  <p className="text-[15px] font-medium text-[#4a4a4a]">
                    Day 1(T3, 05 Thg 08, 2025):
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-[#333]">
                    <MapPin size={18} className="fill-[#333]" />
                  </div>
                </div>
              </div>

              {/* Delete */}
              <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/70 text-[#333] transition hover:bg-white">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t border-gray-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-md bg-[#efefef] px-4 py-2 text-[16px] font-medium text-[#444] transition hover:bg-[#e7e7e7]">
              <Plus size={22} strokeWidth={2.5} />
              <span>Add Last Day</span>
            </button>

            <button className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-[16px] font-medium text-[#444] transition hover:bg-gray-50">
              <RefreshCw size={20} />
              <span>Nhập lại</span>
            </button>
          </div>
        </div>

        {/* Bottom spacer giống modal screenshot */}
        <div className="h-8 border-t border-gray-200 bg-white" />
      </div>
    </div>
  );
};

export default ChangeDayOrder;