
import React, { useState } from 'react';
import {
  Alert,
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  PageSection,
  Title,
} from '@patternfly/react-core';
import { CalendarAltIcon } from '@patternfly/react-icons';
import GlobalScheduler from '../GlobalScheduler/GlobalScheduler';
import ScheduleReportWizard from '../ScheduleReportWizard/ScheduleReportWizard';
import { useSchedulerModal } from '../../hooks/useSchedulerModal';

const SchedulerPage: React.FC = () => {
  // Pattern 1: standalone wizard — no sidebar required.
  // This is how a consumer page triggers scheduling
  // directly from an Export button without opening the full sidebar.
  const wizard = useSchedulerModal();

  // Pattern 2: sidebar — opened independently.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <GlobalScheduler isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
      <PageSection>
        <Alert
          variant="info"
          isInline
          title="Development harness — not the final integration"
        >
          This page is used to test <strong>useSchedulerModal</strong> and{' '}
          <strong>GlobalScheduler</strong> together. Later the <strong>GlobalScheduler</strong> component would be called directly in RedHat Console by clicking the Scheduler in the options menu.
        </Alert>
      </PageSection>
      <PageSection>
        <Title headingLevel="h1" size="2xl">Report Scheduler</Title>
        <PageSection>
          <EmptyState
            icon={CalendarAltIcon}
            titleText="Welcome to Report Scheduler"
            headingLevel="h2"
          >
            <EmptyStateBody>
              Create and manage report schedules to receive automated reports via email.
              <br />
              Get started by configuring your first scheduled report.
            </EmptyStateBody>
            <EmptyStateActions>
              {/* Pattern 1: open the wizard directly — sidebar stays closed */}
              <Button
                variant="primary"
                onClick={() =>
                  wizard.open({
                    service: 'Cost Management',
                    reportName: 'Monthly spend report',
                    fileType: 'PDF',
                    task: 'Task 1',
                  })
                }
              >
                Schedule recurring report
              </Button>
              {/* Pattern 2: open the GlobalScheduler sidebar */}
              <Button variant="secondary" onClick={() => setIsSidebarOpen(true)}>
                Open Global Scheduler
              </Button>
            </EmptyStateActions>
          </EmptyState>
        </PageSection>
      </PageSection>
      <ScheduleReportWizard
        isOpen={wizard.isOpen}
        onClose={wizard.close}
        onSave={(data) => console.log('Saving report:', data)}
        initialValues={wizard.params}
      />
    </GlobalScheduler>
  );
};

export default SchedulerPage;
