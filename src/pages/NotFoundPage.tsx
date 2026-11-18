import { Link } from 'react-router-dom'
import { ToolPageLayout } from '../components/Tools'

export default function NotFoundPage() {
  return <ToolPageLayout title="Page not found." description="We couldn’t find the page you’re looking for."><Link className="text-link" to="/">Return to categories →</Link></ToolPageLayout>
}
