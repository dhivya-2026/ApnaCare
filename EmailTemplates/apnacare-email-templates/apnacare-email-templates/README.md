# ApnaCare email templates

24 responsive HTML email templates with a shared header, footer and CTA buttons (table-based, inline CSS, 600px, mobile-friendly).

## How to use

1. Open a template, copy the HTML into your email tool (Brevo, Mailchimp, Zoho Campaigns, SendGrid, Resend, etc.).
2. Replace each `{{merge_tag}}` with your tool's merge syntax or fill it from your app's data.
3. Add the unsubscribe and preferences links (`{{unsubscribe_url}}`, `{{preferences_url}}`). Your tool usually supplies these.
4. All website links already carry UTM tags (`utm_campaign` = template name) so you can see which email drives bookings.

## Templates


### 1. Onboarding

| File | Send when | Subject |
|---|---|---|
| 01-welcome-new-customer.html | Immediately after a new enquiry or sign-up | Welcome to ApnaCare, {{first_name}}. Here is what happens next |
| 02-enquiry-received.html | Right after the website enquiry form is submitted | We have your request, {{first_name}} |
| 03-consultation-confirmed.html | When a call or visit slot is booked | Your ApnaCare consultation is confirmed for {{consult_date}} |
| 04-caregiver-profile-preview.html | When a caregiver has been matched, before day one | Meet {{caregiver_name}}, matched for {{care_recipient_name}} |
| 05-care-starts.html | The evening before the first shift | {{caregiver_name}} arrives tomorrow at {{arrival_time}} |

### 2. Care reports

| File | Send when | Subject |
|---|---|---|
| 06-daily-care-log.html | End of each shift | Daily care log for {{care_recipient_name}}, {{log_date}} |
| 07-weekly-summary.html | Every Sunday evening | Weekly care summary for {{care_recipient_name}} |
| 08-monthly-report.html | First working day of each month | {{month_name}} care report for {{care_recipient_name}} |

### 3. Service and retention

| File | Send when | Subject |
|---|---|---|
| 09-backup-caregiver-activated.html | When the primary caregiver is unavailable | Your backup caregiver is on the way |
| 10-payment-receipt.html | After a successful payment | Payment received, invoice {{invoice_number}} |
| 11-plan-renewal-reminder.html | 5 to 7 days before the plan ends | {{care_recipient_name}}&rsquo;s care plan ends on {{end_date}} |
| 12-feedback-request.html | 2 days after care ends, or at day 14 of ongoing care | How did we do, {{first_name}}? |

### 4. Lead generation and engagement

| File | Send when | Subject |
|---|---|---|
| 13-lead-followup.html | 24 to 48 hours after an enquiry with no booking | {{first_name}}, can we help with the next step? |
| 14-estimate-followup.html | After someone uses the care-needs calculator | Your care plan estimate: {{total_cost}} |
| 15-attendant-vs-nurse.html | Nurture email, 3 to 5 days after enquiry | Attendant or nurse? How to choose the right care |
| 16-trust-and-safety.html | Nurture email, 5 to 7 days after enquiry | What we check before anyone enters your home |
| 17-pricing-overview.html | Nurture email or campaign to enquirers | Clear daily rates for every kind of care |
| 18-hospital-discharge-checklist.html | Nurture or paid-ads lead magnet delivery | A calm checklist for hospital discharge day |
| 19-postnatal-spotlight.html | Segment campaign to expectant and new parents | Rest for the new mother, gentle care for the baby |
| 20-customer-story.html | Campaign to enquirers who have not booked yet | What families say about ApnaCare |

### 5. Growth and campaigns

| File | Send when | Subject |
|---|---|---|
| 21-referral-invite.html | After positive feedback (rating 4 or 5) | Know a family who needs care support? |
| 22-win-back.html | 60 to 90 days after care ended | It has been a while, {{first_name}} |
| 23-festive-greeting.html | Before major festivals (Pongal, Diwali, Onam, Ugadi and others) | Warm wishes for {{festival_name}} from ApnaCare |
| 24-corporate-eldercare-outreach.html | Outbound to HR and people leaders | Eldercare support your employees can rely on |

## Merge tags used

`{{approve_url}}`, `{{arrival_time}}`, `{{backup_name}}`, `{{booking_url}}`, `{{calendar_url}}`, `{{care_fee}}`, `{{care_plan_url}}`, `{{care_recipient_name}}`, `{{caregiver_changes}}`, `{{caregiver_name}}`, `{{caregiver_note}}`, `{{caregiver_role}}`, `{{certifications}}`, `{{city}}`, `{{company_name}}`, `{{concerns_or_none}}`, `{{consult_date}}`, `{{consult_mode}}`, `{{consult_time}}`, `{{coordinator_name}}`, `{{coordinator_note}}`, `{{current_plan}}`, `{{daily_rate}}`, `{{days_billed}}`, `{{days_covered}}`, `{{duration}}`, `{{end_date}}`, `{{eta}}`, `{{experience_years}}`, `{{feedback_url}}`, `{{festival_name}}`, `{{first_name}}`, `{{gst_amount}}`, `{{highlight_1}}`, `{{highlight_2}}`, `{{highlight_3}}`, `{{invoice_number}}`, `{{invoice_url}}`, `{{languages}}`, `{{log_date}}`, `{{log_url}}`, `{{logs_shared}}`, `{{match_reason}}`, `{{meals_summary}}`, `{{medicine_summary}}`, `{{mobility_summary}}`, `{{month_name}}`, `{{month_summary}}`, `{{mood_summary}}`, `{{on_time_rate}}`, `{{overall_status}}`, `{{payment_date}}`, `{{payment_method}}`, `{{phone}}`, `{{plan_name}}`, `{{police_station}}`, `{{rating_url_1}}`, `{{rating_url_2}}`, `{{rating_url_3}}`, `{{rating_url_4}}`, `{{rating_url_5}}`, `{{reason_short}}`, `{{referral_link}}`, `{{referral_reward}}`, `{{renew_by_date}}`, `{{renew_url}}`, `{{request_id}}`, `{{rest_summary}}`, `{{service_name}}`, `{{service_period}}`, `{{shift_hours}}`, `{{shift_time}}`, `{{shifts_completed}}`, `{{start_date}}`, `{{start_timeframe}}`, `{{subtotal}}`, `{{testimonial_city}}`, `{{testimonial_name}}`, `{{testimonial_quote}}`, `{{total_amount}}`, `{{total_cost}}`, `{{trend_1}}`, `{{trend_2}}`, `{{trend_3}}`, `{{watch_item}}`, `{{week_end}}`, `{{week_start}}`

## Before you send

- Marketing templates (groups 4 and 5) include an unsubscribe link. Keep it, and only email people who enquired or opted in.
- Prices in template 17 come from the website. Update them if your rates change.
- Template 20 needs real testimonials shared with the family's consent.
- Template 21 needs your referral reward wording and a referral link.
- Care reports (06 to 08) should only ever go to the family contact for that care recipient.