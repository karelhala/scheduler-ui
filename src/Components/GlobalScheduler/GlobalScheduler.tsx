import React from 'react';
import {
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelContent,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  Tab,
  TabTitleText,
  Tabs,
  Title,
} from '@patternfly/react-core';
import { EllipsisVIcon, OutlinedQuestionCircleIcon } from '@patternfly/react-icons';
import ScheduleReportWizard from '../ScheduleReportWizard/ScheduleReportWizard';
import SchedulerReportsTable from './SchedulerReportsTable';
import { useSchedulerState } from '../../hooks/useSchedulerState';
import { useSchedulerModal } from '../../hooks/useSchedulerModal';
import './GlobalScheduler.css';

interface GlobalSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const GlobalScheduler: React.FC<GlobalSchedulerProps> = ({ isOpen, onClose, children }) => {
  // Internal wizard state — decoupled from the drawer open state.
  // Consumers who want to open the wizard without the sidebar should use
  // useSchedulerModal + <ScheduleReportWizard> directly in their own page.
  const wizard = useSchedulerModal();

  const {
    activeTabKey, setActiveTabKey,
    isHeaderMenuOpen, setIsHeaderMenuOpen,
    isFilterNameOpen, setIsFilterNameOpen,
    isFilterOpen, setIsFilterOpen,
    page, perPage, onSetPage, onPerPageSelect,
    sortBy, onSort, REPORT_COL, STATUS_COL,
    expandedReportIds, toggleRowExpanded,
    sortedReports,
  } = useSchedulerState();

  const panelContent = (
    <DrawerPanelContent isResizable defaultSize="600px" minSize="400px" maxSize="800px" className="scheduler-ui-panel-content">
      <DrawerHead>
        <Title headingLevel="h2" size="xl">Global scheduler</Title>
        <DrawerActions>
          <Dropdown
            isOpen={isHeaderMenuOpen}
            onOpenChange={setIsHeaderMenuOpen}
            toggle={(ref) => (
              <MenuToggle
                ref={ref}
                variant="plain"
                aria-label="Global scheduler menu"
                onClick={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
                isExpanded={isHeaderMenuOpen}
              >
                <EllipsisVIcon />
              </MenuToggle>
            )}
          >
            <DropdownList>
              <DropdownItem key="refresh">Refresh list</DropdownItem>
              <DropdownItem key="export">Export</DropdownItem>
            </DropdownList>
          </Dropdown>
          <DrawerCloseButton onClick={onClose} />
        </DrawerActions>
      </DrawerHead>

      <div className="tabs-container">
        <Tabs activeKey={activeTabKey} onSelect={(_e, key) => setActiveTabKey(key)}>
          <Tab eventKey={0} title={<TabTitleText>Scheduled reports</TabTitleText>} tabContentId="scheduled-reports-tab" />
          <Tab
            eventKey={1}
            title={
              <TabTitleText>
                Reports history&nbsp;
                <OutlinedQuestionCircleIcon className="scheduler-ui-tab-help-icon" aria-label="Reports history help" />
              </TabTitleText>
            }
            tabContentId="reports-history-tab"
          />
        </Tabs>
      </div>

      <SchedulerReportsTable
        reports={sortedReports}
        page={page}
        perPage={perPage}
        onSetPage={onSetPage}
        onPerPageSelect={onPerPageSelect}
        sortBy={sortBy}
        onSort={onSort}
        reportSortCol={REPORT_COL}
        statusSortCol={STATUS_COL}
        expandedReportIds={expandedReportIds}
        onToggleExpand={toggleRowExpanded}
        isFilterNameOpen={isFilterNameOpen}
        onFilterNameOpenChange={setIsFilterNameOpen}
        isFilterOpen={isFilterOpen}
        onFilterOpenChange={setIsFilterOpen}
        onCreateNew={() => wizard.open()}
      />

      <ScheduleReportWizard
        isOpen={wizard.isOpen}
        onClose={wizard.close}
        onSave={(data) => console.log('Saving report:', data)}
        initialValues={wizard.params}
      />
    </DrawerPanelContent>
  );

  return (
    <Drawer isExpanded={isOpen} className="scheduler-ui global-scheduler-drawer">
      <DrawerContent panelContent={panelContent}>
        <DrawerContentBody>{children}</DrawerContentBody>
      </DrawerContent>
    </Drawer>
  );
};

export default GlobalScheduler;
