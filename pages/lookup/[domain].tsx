import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Container,
  Heading,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import DnsLookup, { ResolvedRecords } from '@/utils/DnsLookup';
import RecordRow from '@/components/RecordRow';

type LookupDomainProps = {
  records?: ResolvedRecords;
};

export const getServerSideProps: GetServerSideProps<LookupDomainProps> = async (
  context
) => {
  const domain = context.query.domain as string;

  try {
    const records = await DnsLookup.resolveAllRecords(domain);

    return {
      props: { records: records, error: false },
    };
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      error: true,
    },
  };
};

const LookupDomain = ({
  records,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  if (!records) {
    return (
      <Container maxW="container.xl">
        <Heading as="h1" mb={5}>
          Results for {router.query.domain}
        </Heading>
        <p>Failed loading</p>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>Results for {router.query.domain} - Domain Digger</title>
      </Head>

      <Container maxW="container.xl">
        <Heading as="h1" mb={5}>
          Results for {router.query.domain}
        </Heading>

        {Object.keys(records).map((recordType) => {
          const value = records[recordType];

          if (!value || value.length === 0) {
            return;
          }

          return (
            <>
              <Heading
                as="h2"
                fontSize={{ base: 'xl', sm: '2xl' }}
                mb={4}
                mt={8}
                ml={5}
              >
                {recordType}
              </Heading>
              <Table key={recordType}>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>TTL</Th>
                    <Th>Value</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {value.map((v) => (
                    <RecordRow key={JSON.stringify(v)} record={v} />
                  ))}
                </Tbody>
              </Table>
            </>
          );
        })}
      </Container>
    </>
  );
};

export default LookupDomain;