import React from 'react'
import { Text } from '@ape.swap/uikit'
import { Container, FlexContainer, Heading, Title, styles } from './styles'

const PrivacyPolicy: React.FC = () => {
  return (
    <Container>
      <FlexContainer>
        <Title>Privacy Policy</Title>
        <Text as="p" variant="sm" sx={styles.text}>
          ApeSwap Foundation (hereinafter ApeSwap) is aware of the importance of personal data privacy and user rights.
          For this reason, we have implemented a personal data protection policy aimed at providing security and
          transparency for our users when using the ApeSwap website, apeswap.finance (hereinafter “the Site”). The use
          and collection of the data is in compliance with the provisions of the Data Protection Act of 2017 and the
          Data Protection Regulation of 2018 of the United Kingdom.
          <br />
          Data processing will be carried out in accordance with the clauses stipulated below:
        </Text>
        <Heading>I. Name and address of the Data Manager:</Heading>
        <Text as="p" variant="sm" sx={styles.text}>
          ApeSwap Foundation, Suite 102, Cannon Place, P.O. Box 712, North Sound Rd., Grand Cayman, KY1-9006.
        </Text>
        <Heading>II. Name and address of the Data Processing Manager:</Heading>
        <Text as="p" variant="sm" sx={styles.text}>
          The entity in charge of data processing and protection of information gathered in the Site is ApeSwap
          Foundation.
        </Text>
        <Heading>III. Processed data and management of personal data:</Heading>
        <Text as="p" variant="sm" sx={styles.text}>
          The processing of personal data will solely be used to manage our platform and provide a better service for
          our users. Personal data will be treated with the appropriate degree of protection, taking the necessary
          security measures to prevent loss, mistreatment, or unauthorized access by third parties.
        </Text>
        <Heading>IV. Legal basis for the processing of personal data:</Heading>
        <Text as="p" variant="sm" sx={styles.text}>
          The legal basis for the treatment of the data is the consent of the user and the treatment is necessary to be
          able to provide the services within the website.
          <br />
          The management and processing of personal data will be carried out within the regulatory framework of The
          Ombudsman Law; The Complaints (Maladministration) Law; The Police (Complaints by the Public); The
          Whistleblower Protection Law; The Freedom of Information Law; The Data Protection Law and Data Protection
          Regulation in compliance with the EU’s General Data Protection Regulation (GDPR) standards.
        </Text>
        <Heading>V. Information ApeSwap Collects from you:</Heading>
        <Text as="p" variant="sm" sx={styles.text}>
          We collect information about you directly from you as well as automatically through your use of our Site. The
          limited information we collect is used to provide the services to you. When you visit the Site, we only use
          the data of the public key of the users to be able to provide the services within the website. When you visit
          the Site, Google Analytics is used and may automatically collect the following information about your use of
          our Site through cookies and other technologies: your IP address; your browser type and operating system;
          links you click; and geolocation data; the amount of time you visit our Site; the referring URL or the web
          page that brought you to our Site. This information will be used solely for statistical purposes. By using the
          Site you authorize us to collect, analyze and retain data related to the provision of the Site.
        </Text>
        <Heading>VI. Information collected by third parties:</Heading>
        <Text as="p" variant="sm" sx={styles.list}>
          1. MoonPay is a commercial Agent dedicated to purchase Cryptocurrency on your behalf and send / deliver it to
          the wallet address indicated at the time of the order subject.
        </Text>
        <Text as="p" variant="sm" sx={styles.list}>
          In the event that the User decides to use MoonPay services, they must allow MoonPay to use the following
          personal data:
        </Text>
        <Text as="p" variant="sm" sx={styles.subList}>
          i. Identification Information: Full name, date of birth, nationality, gender, signature, utility bills,
          photographs, phone number, home address, and/or email.
          <br />
          ii. Formal Identification Information: Government issued identity document such as Passport, Driver&apos;s
          License, National Identity Card, State ID Card, Tax ID number, passport number, driver&apos;s license details,
          national identity card details, visa information, and/or any other information deemed necessary to comply with
          our legal obligations under financial or anti-money laundering laws.
          <br />
          iii. Institutional Information: Employer Identification number (or comparable number issued by a government),
          proof of legal formation (e.g. Articles of Incorporation), personal identification information for all
          material beneficial owners.
          <br />
          iv. Financial Information: Bank account information, payment card primary account number (PAN), transaction
          history, trading data, and/or tax identification.
          <br />
          v. Transaction Information: Information about the transactions you make on our Services, such as the name of
          the recipient, your name, the amount, and/or timestamp.
          <br />
          vi. Employment Information: Office location, job title, and/or description of role.
          <br />
          vii. Correspondence: Survey responses, information provided to our support team or user research team.
        </Text>
        <Text as="p" variant="sm" sx={styles.list}>
          ApeSwap will not process any of the data registered with MoonPay.
          <br />
          The user must in turn accept MoonPay&apos;s privacy policy before using its services. To know more details
          about the data processing carried out by MoonPay, you can click on the following link
          https://www.MoonPay.com/legal/privacy_policy.
          <br />
        </Text>
        <Text as="p" variant="sm" sx={styles.list}>
          2. Torus is an open source, non-custodial key management network, that enable User to create and log in to a
          web3 wallet with an existing social account.
          <br />
          In the event that the User decides to use Torus services, they must allow Torus to use the following personal
          data:
        </Text>
        <Text as="p" variant="sm" sx={styles.subList}>
          i. Public data related to the account and may include the profile photo, username and email address. Private
          data related to the account, such as registered address, and passwords will not be collected by Torus, and is
          not mandatory to the use of service.
        </Text>
        <Text as="p" variant="sm" sx={styles.list}>
          ApeSwap will not process any of the data registered with Torus Labs.
          <br /> The user must in turn accept Torus labs’ privacy policy before using its services. To know more details
          about the data processing carried out by Torus Labs, you can click on the following link
          https://docs.tor.us/legal/privacy-policy#detailed-information-on-the-processing-of-personal-data.
        </Text>
        <Heading>VII. Purpose of data processing:</Heading>
        <Text as="p" variant="sm" sx={styles.text}>
          The data provided by the user will be processed in order to complete the registration forms and thus be able
          to use the Site and its applications.
        </Text>
        <Heading>VIII. Duration of storage and deletion of data:</Heading>
        <Text as="p" variant="sm" sx={styles.text}>
          The personal data will be stored as long as it is necessary to provide the contracted services and will be
          kept stored before possible re-consultations by the clients for the maximum time legally permitted by law.
        </Text>
        <Heading>IX. Communication and data transfer:</Heading>
        <Text as="p" variant="sm" sx={styles.text}>
          Within the framework of this service, the data will be collected by the Data Processing Manager in order to
          provide the services contracted by the user.
          <br />
          Personal data will not be communicated or transferred to third parties without the express consent of the
          user.
        </Text>
        <Heading>X. Limited Right to Use:</Heading>
        <Text as="p" variant="sm" sx={styles.text}>
          ApeSwap grants you a limited right to use the Site. Your right to use the Site is subject to your agreement to
          abide by these Terms and Conditions in their entirety, as well as any other rules, procedures, policies, terms
          or conditions that govern all or any portion of the Site. At any time and for any reason ApeSwap may revoke
          your right to use all or any portion of the Site.
        </Text>
        <Heading>XI. Confidentiality:</Heading>
        <Text as="p" variant="sm" sx={styles.text}>
          The treatment of personal data will be carried out with the utmost reserve and confidentiality, not being
          communicated, transferred or disclosed to third parties that have not been named in this policy.
        </Text>
        <Heading>
          XII. Exercises of rights regarding data processing and withdrawal of commercial communications:
        </Heading>
        <Text as="p" variant="sm" sx={styles.text}>
          Users may at any time request Access, Rectification, Cancellation, Opposition and withdrawal of commercial
          communications and personal information in compliance with the EU’s GDPR (General Data Protection Regulation)
          Right of Access, which has the following principles:
        </Text>
        <Text as="p" variant="sm" sx={styles.list}>
          a) Access: The user may have access to all the data being processed.
          <br />
          b) Rectification: If the user considers that a personal data is inaccurate, he may request its rectification.
          <br />
          c) Cancellation: If the user no longer wishes their data to be processed, they may request the total or
          partial deletion of their personal data, under the understanding that, if the data is necessary for the
          management of their file and registration, without that information it will not be possible to continue
          providing the contracted service.
          <br />
          d) Opposition: If the user considers it pertinent, he may oppose the processing of his data. Under the
          understanding that the data is necessary for the management of your file and registration, without said
          information the service can no longer be provided.
          <br /> e) Withdrawal of commercial communications: If the user decides to stop receiving commercial
          communications, offers and newsletters, they may request it without this interfering with the contracted
          services.
        </Text>
        <Heading>XIII. Procedure:</Heading>
        <Text as="p" variant="sm" sx={styles.text}>
          The user may exercise their Rights of Access, rectification, opposition, cancellation and withdrawal of
          personal information, commercial communications, offers and newsletters, simply by sending an email to
          privacy@apeswap.finance with the subject line: &quot;Data Rights&quot;. Include your name and we will contact
          you as soon as possible.
        </Text>
      </FlexContainer>
    </Container>
  )
}

export default React.memo(PrivacyPolicy)
