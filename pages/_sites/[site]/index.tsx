import { useRouter } from "next/router";
import styles from '../../../styles/Home.module.css';
// we will create these in the next step
import { getHostnameDataBySubdomain, getSubdomainPaths } from "@/lib/db";

// Our types for the site data
export interface Props {
  name: String
  description: String
  subdomain: String
  customDomain: String
}

export default function Index(props: Props) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <>
        <p>
          Loading...
        </p>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <h1>
        {props.name}
      </h1>
    </div>
  )
}

// Getting the paths for all the subdomains in our database
export async function getStaticPaths() {
  const paths = await getSubdomainPaths()

  return {
    paths,
    fallback: true
  }
}

// Getting data to display on each custom subdomain
export async function getStaticProps({ params: { site } }) {
  const sites = await getHostnameDataBySubdomain(site)

  return {
    props: sites,
    revalidate: 3600
  }
}