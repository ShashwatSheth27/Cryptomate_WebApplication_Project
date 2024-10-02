import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Divider } from 'antd';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
// const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
  // Note: To access this endpoint you need premium plan
  if (isFetching) return <Loader />;

  return (
    <>
      <div style={{ backgroundColor: 'white' ,padding: 10}}>
        <Row>
          <Col span={5} offset={5}>Exchanges</Col>
          <Col span={4}>Markets</Col>
          <Col span={5}>24h Volume</Col>
          <Col span={5}>Price</Col>
        </Row>
        <Divider />
      </div>
      <div style={{ backgroundColor: 'white' }}>
        {exchangesList.map((exchange) => (
          <Row key={exchange?.uuid} style={{ padding: 10 }}>
            <Col span={6} offset={4}>
              <Text><strong>{exchange?.rank}.</strong></Text>
              <Avatar className="exchange-image" src={exchange?.iconUrl} />
              <Text><strong>{exchange?.name}</strong></Text>
            </Col>
            <Col span={4}>{millify(exchange?.numberOfMarkets)}</Col>
            <Col span={5}>&nbsp;&nbsp;{millify(exchange['24hVolume'])}</Col>
            <Col span={5}>${millify(exchange.price)}</Col>
          </Row>
        ))}
      </div>
    </>
  );
};

export default Exchanges;

{/* <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange?.uuid}
                showArrow={false}
                header={(
                  <Row key={exchange?.uuid}>
                    <Col span={6}>
                      <Text><strong>{exchange?.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange?.iconUrl} />
                      <Text><strong>{exchange?.name}</strong></Text>
                    </Col>
                    <Col span={6}>{millify(exchange?.numberOfMarkets)}</Col>
                    <Col span={6}>${millify(exchange['24hVolume'])}</Col>
                    <Col span={6}>${millify(exchange.price)}</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange['24hVolume'] || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row> */}