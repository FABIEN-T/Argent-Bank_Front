import FeatureItem from './FeatureItem.jsx'

import IconChat from '../img/icon-chat.png'
import IconMoney from '../img/icon-money.png'
import IconSecurity from '../img/icon-security.png'

export default function Features() {
  const datasFeature = [
    {
      icon: IconChat,
      title: 'You are our #1 priority',
      paragraph:
        'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    },
    {
      icon: IconMoney,
      title: 'More savings means higher rates',
      paragraph:
        'The more you save with us, the higher your interest rate will be!',
    },
    {
      icon: IconSecurity,
      title: 'Security you can trust',
      paragraph:
        'We use top of the line encryption to make sure your data and money is always safe.',
    },
  ]

  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {datasFeature.map((object) => {
        return (
          <FeatureItem
            key={object.icon}
            icon={object.icon}
            title={object.title}
            paragraph={object.paragraph}
          />
        )
      })}
    </section>
  )
}
