import { ResourceCard, ToolPageLayout } from '../components/Tools'
import { resources } from '../registry'

export default function ResourcesPage() {
  return (
    <ToolPageLayout title="External resources" description="Useful destinations beyond Web Box, collected in one place.">
      <p className="secondary resource-summary">{resources.length} external resources. Links open in a new tab. Each site has its own privacy policy and data handling practices.</p>
      <div className="tool-grid">{resources.map(resource => <ResourceCard key={resource.id} resource={resource} />)}</div>
    </ToolPageLayout>
  )
}
