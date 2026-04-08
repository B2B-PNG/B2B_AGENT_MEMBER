import { ArrowLeft, Calendar, ChevronDown, Copy, Edit3, MapPin, Play, Plus, Users, X } from "lucide-react";
import UpdateTour from "./update-tour";

import { useState } from "react";

export const DetailTour = () => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div>
            <DetailTourHeader onEdit={() => setIsEdit(true)} />

            {isEdit ? <UpdateTour onBack={() => setIsEdit(false)} /> : <DetailTourContent />}
        </div>
    );
};



interface Props {
    onEdit: () => void;
}

const DetailTourHeader = ({ onEdit }: Props) => {
    return (
        <div className="w-full bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between font-sans">
            <div className="flex items-center gap-4">
                <ArrowLeft size={20} />
                <div className="space-y-1">
                    <div className="relative group inline-block">
                        <button
                            onClick={onEdit}
                            className="cursor-pointer flex items-center gap-2"
                        >
                            <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                                Test tour
                            </h1>
                        </button>

                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 
    whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded 
    opacity-0 group-hover:opacity-100 transition">
                            Click to edit
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-[13px] text-gray-500 font-normal">
                        <div className="flex items-center gap-1.5">
                            <span># 16E2351</span>
                            <Copy size={14} className="text-blue-400 cursor-pointer hover:text-[#004b91]" />
                        </div>
                        <span className="text-gray-300">|</span>

                        <div className="flex items-center text-gray-700 font-medium">
                            [<span className="flex items-center text-[10px] mx-0.5">★★★★</span>]
                        </div>
                        <span className="text-gray-300">|</span>

                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>T3, 29 Thg 09, 2026 - T2, 28 Thg 09, 2026</span>
                        </div>
                        <span className="text-gray-300">|</span>

                        <div className="flex items-center gap-1.5">
                            <Users size={14} />
                            <span>4</span>
                            <button className="text-blue-400 hover:text-[#004b91]">
                                <Play size={12} className="rotate-90 fill-current" />
                            </button>
                        </div>
                        <span className="text-gray-300">|</span>

                        <div className="flex items-center gap-1">
                            <span>Ver⁺</span>
                            <div className="flex items-center gap-0.5 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 cursor-pointer">
                                <span className="font-bold text-gray-800">1</span>
                                <ChevronDown size={12} />
                            </div>
                            <X size={12} className="text-gray-300 cursor-pointer hover:text-red-400" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right mr-2">
                    <div className="text-2xl text-gray-800 font-normal tracking-tight underline decoration-gray-300 underline-offset-4">
                        đ0
                    </div>
                    <div className="text-[13px] text-green-500 font-normal flex items-center justify-end gap-1">
                        <span className="text-[10px]">↑</span>0(%)
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 border border-blue-400 text-[#004b91] text-[13px] font-bold rounded-lg hover:bg-blue-50 transition-all uppercase">
                        Gửi Email
                    </button>

                    <button className="px-5 py-2 bg-[#004b91] text-white text-[13px] font-bold rounded-lg hover:bg-[#003c73] transition-all uppercase">
                        Book
                    </button>

                    <button className="px-4 py-2 bg-[#ff9800] text-white text-[13px] font-bold rounded-lg hover:bg-[#f57c00] transition-all flex items-center gap-2 uppercase">
                        <Play size={14} className="fill-current" />
                        Preview
                    </button>

                    <button className="px-4 py-2 bg-[#1e5bab] text-white text-[13px] font-bold rounded-lg hover:bg-[#154a8a] transition-all flex items-center gap-2 uppercase">
                        <Play size={14} className="fill-current" />
                        Preview PDF (Demo)
                    </button>
                </div>
            </div>
        </div>
    );
};

const DetailTourContent = () => {
  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50 overflow-hidden font-sans">
      <div className="w-20 lg:w-48 bg-white border-r border-gray-100 flex flex-col items-center py-6 gap-4">
        <button className="w-12 h-12 lg:w-40 lg:h-10 flex items-center justify-center gap-2 bg-blue-50 text-[#004b91] rounded-xl hover:bg-blue-100 transition-all group">
          <Edit3 size={18} />
          <span className="hidden lg:inline text-xs font-bold uppercase tracking-tight">Chỉnh sửa ngày</span>
        </button>
        
        <button className="w-12 h-12 lg:w-40 lg:h-10 flex items-center justify-center gap-2 border border-dashed border-gray-300 text-gray-400 rounded-xl hover:border-[#004b91] hover:text-[#004b91] transition-all group">
          <Plus size={18} />
          <span className="hidden lg:inline text-xs font-bold uppercase tracking-tight">Add Day</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 bg-white">
       
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <h3 className="text-lg font-bold text-gray-800">Bao Gồm / Không Bao Gồm</h3>
            <Edit3 size={16} className="text-blue-400 cursor-pointer" />
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-[13px] leading-relaxed">
            <div className="space-y-2">
              <p className="font-bold text-gray-700">Bao gồm:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
                <li>Services of a driver and private air-conditioned vehicle</li>
                <li>Experienced English-speaking guide</li>
                <li>Accommodation in twin/double room with breakfast</li>
                <li>Entrance fees for all visits</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-gray-700">Không bao gồm:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
                <li>Travel insurance (highly recommended)</li>
                <li>Personal expenses (laundry, telephone, drinks...)</li>
                <li>Meals, if not specified in the itinerary</li>
                <li>Vietnam E-visa assistance USD 10$ per pax</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold text-gray-800">Total Price</h3>
            <button className="px-4 py-1.5 bg-blue-600 text-white text-[11px] font-bold rounded uppercase hover:bg-blue-700 transition-colors">
              Recalculate Price
            </button>
            <button className="px-4 py-1.5 bg-blue-500 text-white text-[11px] font-bold rounded uppercase hover:bg-blue-600 transition-colors">
              Overview Price
            </button>
          </div>
          
          <div className="w-full border border-gray-100 rounded-xl overflow-hidden">
             <table className="w-full text-left text-[13px]">
               <thead className="bg-gray-50 text-gray-500 font-medium">
                 <tr>
                   <th className="px-4 py-3">Description</th>
                   <th className="px-4 py-3 text-right">Adult(4)</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 <tr>
                   <td className="px-4 py-6 text-gray-400 italic" colSpan={2}>Không có dữ liệu</td>
                 </tr>
               </tbody>
             </table>
          </div>
        </div>
      </div>

      <div className="hidden xl:block w-100 bg-gray-100 border-l border-gray-200 relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 space-y-2">
          <MapPin size={48} strokeWidth={1} />
          <span className="text-sm font-medium tracking-tight">Map API Loading Area...</span>
        </div>
        
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] text-gray-500 border border-gray-100">
           © OpenStreetMap contributors
        </div>
      </div>
    </div>
  );
};