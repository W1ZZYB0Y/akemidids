import React from 'react';
import { Container, Card } from 'react-bootstrap';

const TermsPage = () => {
  return (
    <Container className="mt-5">
      <Card className="p-4">
        <h2>Terms and Conditions for Jaws Crypto Game</h2>
        <p><strong>Effective Date:</strong> [Insert Date]</p>

        <ol>
          <li>
            <strong>Game Overview</strong><br />
            Jaws is a casual, reward-based game hosted on Telegram. Players engage in tasks such as tapping, referring friends, and completing airdrop missions to earn in-game points, ranks, and tokens.
          </li>
          <li>
            <strong>No Monetary Value</strong><br />
            All in-game currencies, tokens, or points earned or distributed within Jaws currently have no real-world or monetary value.
          </li>
          <li>
            <strong>Eligibility</strong><br />
            You must be at least 13 years old to participate.
          </li>
          <li>
            <strong>User Conduct</strong><br />
            - No bots or automation<br />
            - No spam or exploitation<br />
            - Respect all users and the Jaws team
          </li>
          <li>
            <strong>Referral and Ranking System</strong><br />
            Abuse of referrals (e.g., fake accounts) is prohibited.
          </li>
          <li>
            <strong>Ads and Promotions</strong><br />
            We are not responsible for third-party ad content.
          </li>
          <li>
            <strong>Disclaimer</strong><br />
            No earnings or rewards are guaranteed. Jaws is a beta project.
          </li>
          <li>
            <strong>Limitation of Liability</strong><br />
            We are not liable for technical issues or third-party actions.
          </li>
          <li>
            <strong>Data and Privacy</strong><br />
            Non-personal usage data may be collected for improvements.
          </li>
          <li>
            <strong>Changes to Terms</strong><br />
            These Terms may change; continued use implies acceptance.
          </li>
          <li>
            <strong>Contact</strong><br />
            For inquiries, contact us via Telegram or email [jawscomm].
          </li>
        </ol>
      </Card>
    </Container>
  );
};

export default TermsPage;