import { Row, Col } from "react-bootstrap";
import GovernanceSpaceItem from "../GovernanceSpaceItem";

export interface SnapshotSpaceProps {
  name: string;
  symbol: string;
  network: string;
};

export interface GovernanceSpaceListProps {
  items: Array<SnapshotSpaceItemProps>;
  loading: boolean | any;
};

export interface SnapshotSpaceItemProps {
  space: SnapshotSpaceProps;
  key: string;
  pinned: boolean;
};

const GovernanceSpaceList = ({ loading, items }: GovernanceSpaceListProps) => {
  // TODO: implement InfiniteScroll
  const renderedItems = items.slice(0, 100);

  if (loading) {
    return (
      <Row>
        {[...Array(12)].map((value, i) => {
          return (
            <Col key={`loading-${i}`} className={"d-flex"} xs={6} lg={4} xl={3}>
              <GovernanceSpaceItem
                space={{
                  name: `loading-${i}`,
                  symbol: `loading-${i}`,
                  network: `loading-${i}`,
                }}
                id={`loading-${i}`}
                pinned={false}
                symbolIndex={"space"}
                loading={true}
              />
            </Col>
          );
        })}
      </Row>
    );
  }

  if (items.length === 0) {
    return <h3>No results</h3>;
  }

  return (
    <Row>
      {renderedItems.map((item, i) => {
        return (
          <Col key={`space-${i}`} className={"d-flex"} xs={6} lg={4} xl={3}>
            <GovernanceSpaceItem
              space={item.space}
              id={item.key}
              pinned={item.pinned}
              symbolIndex={"space"}
              loading={false}
            />
          </Col>
        );
      })}
      {items.length > 100 && (
        <Col xs={12}>
          <h3 className='text-center mt-4'>Use the Search for more results</h3>
        </Col>
      )}
    </Row>
  );
};

export default GovernanceSpaceList;
