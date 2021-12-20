import React from 'react';
import intl from 'react-intl-universal';
import { defaultTo } from 'lodash';
import styled from 'styled-components';

import {
  CommercialDocHeader,
  CommercialDocTopHeader,
  FormatDate,
  T,
  DetailsMenu,
  DetailItem,
  Row,
  Col,
  ButtonLink,
} from 'components';
import { useEstimateDetailDrawerContext } from './EstimateDetailDrawerProvider';
import { EstimateDetailsStatus } from './components';

/**
 * Estimate read-only details drawer header.
 */
export default function EstimateDetailHeader() {
  const { estimate } = useEstimateDetailDrawerContext();

  return (
    <CommercialDocHeader>
      <CommercialDocTopHeader>
        <DetailsMenu>
          <AmountEstimateDetail label={intl.get('amount')}>
            <span class="big-number">{estimate.formatted_amount}</span>
          </AmountEstimateDetail>

          <EstimateStatusDetail>
            <EstimateDetailsStatus estimate={estimate} />
          </EstimateStatusDetail>
        </DetailsMenu>
      </CommercialDocTopHeader>

      <Row>
        <Col xs={6}>
          <DetailsMenu direction={'horizantal'} minLabelSize={'180px'}>
            <DetailItem
              label={intl.get('estimate.details.estimate_number')}
              children={defaultTo(estimate.estimate_number, '-')}
            />

            <DetailItem label={intl.get('customer_name')}>
              <ButtonLink>{estimate.customer?.display_name}</ButtonLink>
            </DetailItem>

            <DetailItem
              label={intl.get('estimate_date')}
              children={estimate.formatted_estimate_date}
            />

            <DetailItem
              label={intl.get('expiration_date')}
              children={estimate.formatted_expiration_date}
            />
          </DetailsMenu>
        </Col>

        <Col xs={6}>
          <DetailsMenu
            textAlign={'right'}
            direction={'horizantal'}
            minLabelSize={'180px'}
          >
            <DetailItem
              label={intl.get('reference')}
              children={defaultTo(estimate.reference, '-')}
            />
            <DetailItem
              label={<T id={'estimate.details.created_at'} />}
              children={<FormatDate value={estimate.created_at} />}
            />
          </DetailsMenu>
        </Col>
      </Row>
    </CommercialDocHeader>
  );
}

const EstimateStatusDetail = styled(DetailItem)`
  width: 50%;
  text-align: right;
`;
const AmountEstimateDetail = styled(DetailItem)`
  width: 50%;
`;
