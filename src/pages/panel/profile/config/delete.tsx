/** @format */
import { useState } from 'react';
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { Switch } from '@headlessui/react'
// Layout and Header
import AdminLayout from "@/components/layout/admin";
// Forms
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomDelete } from '@/components/forms';
import { FormStyles } from '@/helpers';

const ProfileConfig = () => {
    const t = useTranslations("Panel_Profile_Delete");
    const tb = useTranslations("btn");

    return (
        <>
            {/* Bottom section */}
            <div className="w-screen min-h-0 overflow-hidden">
                <form className="lg:col-span-9" action="#" method="POST">
                    {/* Profile section */}
                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                        <div className="grid text-stone-500 text-20 ">
                            {t('message')}
                        </div>
                    </div>
                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-6">
                                <select
                                    id="lang"
                                    name="lang"
                                    className={FormStyles('select')}
                                    defaultValue={''}
                                >
                                    <option value='' className='text-customRed'>{t('why')}</option>
                                    {/*}
                                    {sexOptions.map((item) => {
                                        return (
                                            <option value={item.value}>{item.name}</option>
                                        )
                                    })}*/}
                                </select>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-6">
                                <p className='text-customRed'>
                                {t('confirm_email')}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Buttons section */}
                    <div className="divide-y divide-gray-200 pt-6">
                        <div className="mt-4 flex justify-end gap-x-3 py-4 px-4 sm:px-6">
                            <CustomDelete text={tb('form_delete_account')} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

ProfileConfig.Layout = AdminLayout;
export default ProfileConfig;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
        },
    };
}