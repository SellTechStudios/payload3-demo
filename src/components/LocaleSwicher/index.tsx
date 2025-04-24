import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcherSelect from './LocaleSelect'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          label: t('english'),
        },
        {
          value: 'pl',
          label: t('polish'),
        },
      ]}
      label={t('label')}
    />
  )
}
