import { profile } from '../data/profile.ts'
import { asset } from '../lib/url.ts'

/** 이메일과 소셜 링크는 `data/profile.ts`에서 읽는다. */
export function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <h2 className="section__title reveal" id="contact-title">
        연락
      </h2>

      <div className="contact reveal">
        <p className="contact__lead">하고 싶은 이야기가 있으면 편하게 메일 주세요. 읽고 답장합니다.</p>

        {/* 난독화 없이 평범한 mailto: 로 둔다. 스팸 봇 대비보다 접근성과 편의가 우선이다. */}
        <a className="contact__email" href={`mailto:${profile.email}`}>
          <svg className="icon" aria-hidden="true" focusable="false">
            <use href={`${asset('/icons.svg')}#mail`} />
          </svg>
          <span>{profile.email}</span>
        </a>

        <ul className="social-list">
          {profile.socials.map((link) => (
            <li key={link.href}>
              <a
                className="social-list__link"
                href={link.href}
                aria-label={link.label}
                title={link.label}
                {...(link.icon === 'mail' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <svg className="icon" aria-hidden="true" focusable="false">
                  <use href={`${asset('/icons.svg')}#${link.icon}`} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
