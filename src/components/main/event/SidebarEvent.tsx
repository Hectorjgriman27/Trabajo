import React from 'react';
import { CurrentColor, classNames } from '@/helpers';
import { Button, Icon, WillAttend } from '@/components/commons';
import formatNumber from 'format-number';
import { useLocale, useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import parseDate from '@/helpers/parseDate';
import { useRouter } from 'next/router';
import { useUserAuthObserver } from '@/hooks/auth';
import {
  CalendarDaysIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapIcon,
} from '@heroicons/react/24/outline';
export type props = {
  className?: string;
  id: string;
  name: string;
  willAttend?: boolean;
  cost: number;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  color: string;
  supplier: string;
};
// TODO: time values
const SidebarEvent: React.FC<props> = ({
  className,
  cost,
  endDate,
  endTime,
  id,
  location,
  name,
  startDate,
  startTime,
  willAttend = false,
  category,
  color,
  supplier,
}) => {
  const t = useTranslations('Sidebar_Event');
  const currentColor = CurrentColor();
  const { isAuthenticated } = useUserAuthObserver();
  const router = useRouter();
  const locale = useLocale();
  return (
    <aside className={classNames('flex flex-col', className)}>
      <div className="shadow-xl rounded-xl overflow-hidden">
        <div className="h-6" style={{ backgroundColor: color }} />
        <div className="px-10 flex justify-between items-center gap-10 py-5">
          <p>
            <span className="md:hidden text-gray-500 uppercase">
              {category}
            </span>
            <span className="block text-2xl font-semibold">{name}</span>
            {isAuthenticated && (
              <WillAttend className="mt-3 hidden md:inline-flex" />
            )}
          </p>
          {isAuthenticated && (
            <Button
              color="white"
              shape="pill"
              iconLeft={
                willAttend ? (
                  <Icon name="heart-solid" className="text-customYellow" />
                ) : (
                  <Icon name="heart-outline" className="text-customGray" />
                )
              }
            />
          )}
        </div>
        <hr className="border-gray-200 h-[1px]" />
        <div className="px-10 py-5">
          <ul className="mt-5 space-y-3">
            <li>
              <span className="font-base flex items-center gap-1.5">
                <CurrencyDollarIcon
                  className={`w-5 h-5 text-${currentColor}`}
                />
                {t('cost_label')}
              </span>
              <p className="flex gap-2 text-customGray">
                {t('cost_value', {
                  value: formatNumber({ prefix: '$', suffix: ' MXN' })(cost),
                })}
              </p>
            </li>
            <li>
              <span className="font-base flex items-center gap-1.5">
                <CalendarDaysIcon className={`w-5 h-5 text-${currentColor}`} />
                {t('date')}
              </span>
              <p className="flex gap-2 text-customGray">
                <span>
                  {format(parseDate(startDate), 'EEEE, dd MMMM yyyy', {
                    locale: locale == 'en' ? enUS : es,
                  })}
                </span>
                <span>-</span>
                <span>
                  {format(parseDate(endDate), 'dd MMMM yyyy', {
                    locale: locale == 'en' ? enUS : es,
                  })}
                </span>
              </p>
            </li>
            <li>
              <span className="font-base flex items-center gap-1.5">
                <ClockIcon className={`w-5 h-5 text-${currentColor}`} />
                {t('time')}
              </span>
              <p className="flex gap-2 text-customGray">
                {startTime}
                <span>-</span>
                {endTime}
              </p>
            </li>
            <li>
              <span className="font-base flex items-center gap-1.5">
                <MapIcon className={`w-5 h-5 text-${currentColor}`} />
                {t('location')}
              </span>
              <span className="text-customGray">{location}</span>
            </li>
          </ul>

          {isAuthenticated && (
            <Button
              fullWidth
              className="mt-24"
              onClick={() => router.push(`/event/${id}/checkout`)}
            >
              {t('button')}
            </Button>
          )}

          <div className="flex gap-2 flex-col mt-7">
            <span className="mx-auto text-sm font-semibold">
              {t('payment_methods')}
            </span>
            <div className="mx-auto flex gap-2">
              <Icon name="visa" className="w-7 h-5" />
              <Icon name="master-card" className="w-7 h-5" />
              <Icon name="amex" className="w-7 h-5" />
              <Icon name="paypal" className="w-7 h-5" />
              <Icon name="mercado-pago" className="w-7 h-5" />
            </div>
          </div>
        </div>
      </div>
      <div className="inline-block mt-10 mx-auto">
        <span className="font-semibold">{t('supplier')}</span> {supplier}
      </div>
    </aside>
  );
};

export default SidebarEvent;
