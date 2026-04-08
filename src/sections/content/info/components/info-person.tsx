import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import "react-quill-new/dist/quill.snow.css";

import { Field, Form } from "@/components/hook-form";
import { useToastStore } from "@/zustand/useToastStore";
import { useState } from "react";
import PanelPopup from "@/components/popup/panel-popup";
import ChangeIdUser from "./change-id-user";
import ChangePasswordUser from "./change-password-user";
import { CURRENCYS_OPTIONS, LANGUES_OPTIONS, TITLES_OPTIONS } from "../../../../utils/oprion-data";
import { useUserStore } from "@/zustand/useUserStore";
import { getUrlImage } from "@/utils/format-image";
import { updMemberInfoProfile } from "@/hooks/actions/useUser";
import { useMutation } from "@tanstack/react-query";

const Schema = zod.object({
    username: zod.string().default(""),
    title: zod.string().default(""),
    firstName: zod.string().default(""),
    lastName: zod.string().default(""),
    phone: zod.string().default(""),
    email: zod
        .string()
        .email()
        .or(zod.literal("")),
    position: zod.string().default(""),
    company: zod.string().default(""),
    skype: zod.string().default(""),
    facebook: zod.string().default(""),
    address: zod.string().default(""),
    bio: zod.string().default(""),
    signature: zod.string().default(""),

    language: zod.number().default(0),
    currency: zod.number().default(0),
});

type SchemaType = zod.infer<typeof Schema>;

const InfoPerson = () => {

    const user = useUserStore((state) => state.user);

    const { showToast } = useToastStore();

    const { mutate: updMemberInfoProfileApi, isPending: isLoading } = useMutation({
        mutationFn: updMemberInfoProfile,
    });

    const [open, setOpen] = useState({
        changeId: false,
        changePw: false,
    })
    const defaultValues: SchemaType = {
        username: "",
        title: "",
        firstName: `${user?.strFirstName}`,
        lastName: `${user?.strLastName}`,
        phone: `${user?.strCompanyPhone}`,
        email: `${user?.strEmail}`,
        position: "",
        company: "",
        skype: "",
        facebook: "",
        address: "",
        language: Number(user?.intLangID) || 0,
        currency: Number(user?.intCurrencyID) || 0,
        bio: "",
        signature: "",
    };

    const methods = useForm<SchemaType>({
        resolver: zodResolver(Schema) as any,
        defaultValues,
    });

    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = handleSubmit(async (data) => {

        const payload = {
            strMemberGUID: user?.strUserGUID,
            strFirstName: data.firstName,
            strLastName: data.lastName,
            strMobile: data.phone,
            strEmailWorking: data.email,
            strContactAddr: data.address,
            strAvatar: "",
            strJobTitle: data.position,
            strCompany: data.company,
            strFacebook: data.facebook,
            strSkype: data.skype,
            strRemark: data.bio,
            strSignature: data.signature,
            intSaluteID: Number(data.title),
            intLangID: Number(data.language),
            intCurrencyID: Number(data.currency)
        };

        updMemberInfoProfileApi(payload, {
            onSuccess: () => {
                showToast("success", "Cập nhật thành công");
            },
            onError: () => {
                showToast("error", "Cập nhật thất bại");
            },
        });
    });

    const renderForm = (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8">

            <div className="flex gap-8 items-start">
                <div className="flex flex-col items-center gap-2">
                    <div className={`overflow-hidden w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 ${user?.strAvatar ? "" : "border-dashed"} border-gray-300`}>
                        {user ?
                            <img src={getUrlImage(user?.strAvatar)} alt={user?.strAvatar} className="w-full h-full object-cover" />
                            :
                            <span className="text-gray-400 text-xs text-center px-2">Ảnh đại diện</span>
                        }
                    </div>
                </div>

                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-500">Tên đăng nhập</p>
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-lg">{user?.strFullName}</span>
                        <button onClick={() => setOpen((prev) => ({ ...prev, changeId: true }))} type="button" className="cursor-pointer text-blue-600 text-sm hover:underline">(Thay đổi)</button>
                        <button onClick={() => setOpen((prev) => ({ ...prev, changePw: true }))} type="button" className="cursor-pointer text-blue-600 text-sm hover:underline">Đổi mật khẩu</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                <Field.Select
                    name="title"
                    label={{
                        text: "Danh xưng",
                        icon: <span className="text-red-500">*</span>,
                    }}
                    options={TITLES_OPTIONS}
                />

                <Field.Text
                    name="firstName"
                    label={{
                        text: "Tên",
                        icon: <span className="text-red-500">*</span>,
                    }}
                    placeholder="Nhập tên"
                />

                <Field.Text
                    name="lastName"
                    label={{
                        text: "Họ và đệm",
                        icon: <span className="text-red-500">*</span>,
                    }}
                    placeholder="Nhập họ"
                />

                <Field.Text
                    name="phone"
                    label={{
                        text: "Di động",
                        icon: <span className="text-red-500">*</span>,
                    }}
                    placeholder="Nhập số điện thoại"
                />

                <Field.Text
                    name="email"
                    label={{
                        text: "Email",
                        icon: <span className="text-red-500">*</span>,
                    }}
                    placeholder="Nhập email"
                />

                <div />

                <Field.Text
                    name="position"
                    label={{ text: "Chức vụ" }}
                    placeholder="Nhập chức vụ"
                />

                <Field.Text
                    name="company"
                    label={{ text: "Đơn vị công tác" }}
                    placeholder="Tên công ty"
                />

                <Field.Text
                    name="skype"
                    label={{ text: "Skype" }}
                    placeholder="Link skype"
                />

                <Field.Text
                    name="facebook"
                    label={{ text: "Facebook" }}
                    placeholder="Link facebook"
                />

                <Field.Text
                    name="address"
                    label={{ text: "Địa chỉ" }}
                    placeholder="Nhập địa chỉ"
                />

                <Field.Select
                    name="language"
                    label={{
                        text: "Ngôn ngữ",
                        icon: <span className="text-red-500">*</span>,
                    }}
                    options={LANGUES_OPTIONS}
                />

                <Field.Select
                    name="currency"
                    label={{
                        text: "Đơn vị tiền tệ (ĐVTT)",
                        icon: <span className="text-red-500">*</span>,
                    }}
                    options={CURRENCYS_OPTIONS}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Giới thiệu bản thân</label>
                <div className="rounded-xl overflow-hidden border border-gray-200">
                    <Field.Editor name="bio" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Signature</label>
                <div className="rounded-xl overflow-hidden border border-gray-200">
                    <Field.Editor name="signature" />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="cursor-pointer w-full px-16 py-2.5 bg-[#004b91] hover:bg-[#003d75] rounded-lg text-white transition-colors disabled:opacity-50"
                >
                    {isSubmitting || isLoading ? "Đang lưu..." : "Lưu"}
                </button>
            </div>
        </div>
    )
    return (
        <div className="">

            <Form methods={methods} onSubmit={onSubmit}>
                {renderForm}
            </Form>


            {open.changeId && (
                <PanelPopup title="Thay đổi tên đăng nhập" open={open.changeId} onClose={() => setOpen((prev) => ({ ...prev, changeId: false }))}>
                    <ChangeIdUser />
                </PanelPopup>
            )}
            {open.changePw && (
                <PanelPopup title="Đổi mật khẩu" open={open.changePw} onClose={() => setOpen((prev) => ({ ...prev, changePw: false }))}>
                    <ChangePasswordUser onClose={() => setOpen((prev) => ({ ...prev, changePw: false }))} />
                </PanelPopup>
            )}
        </div>
    );
};

export default InfoPerson;