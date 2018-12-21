import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { Formik } from 'formik';
import { T } from '@deity/falcon-i18n';
import { H1, Box, Button, FlexLayout } from '@deity/falcon-ui';
import {
  toGridTemplate,
  FormField,
  Form,
  FormErrorSummary,
  AddressQuery,
  EditAddressMutation
} from '@deity/falcon-ecommerce-uikit';

const AddressFormArea = {
  contact: 'contact',
  address: 'address'
};

const editAddressFormLayout = {
  formLayout: {
    display: 'grid',
    gridColumnGap: {
      xs: 'sm',
      md: 'xxl'
    },
    gridRowGap: {
      xs: 'sm',
      md: 'md'
    },
    my: 'lg',
    // prettier-ignore
    gridTemplate: {
      xs: toGridTemplate([
        ['1fr'],
        [AddressFormArea.contact],
        [AddressFormArea.address]
      ]),
      md: toGridTemplate([
        ['1fr', '1fr'],
        [AddressFormArea.contact, AddressFormArea.address]
      ])
    }
  }
};

const EditAddress = ({ match, history }) => {
  const id = parseInt(match.params.id, 10);

  return (
    <AddressQuery variables={{ id }}>
      {({ address }) => {
        const titleContext =
          (address.defaultBilling && 'billing') || (address.defaultBilling && 'shipping') || undefined;

        return (
          <Box>
            <H1>
              <T id="editAddress.title" context={titleContext} />
            </H1>
            <EditAddressMutation>
              {(editAddress, { loading, error }) => (
                <Formik
                  initialValues={{
                    firstname: address.firstname,
                    lastname: address.lastname,
                    street: address.street[0],
                    postcode: address.postcode,
                    city: address.city,
                    countryId: address.countryId,
                    company: address.company,
                    telephone: address.telephone
                  }}
                  onSubmit={values =>
                    editAddress({
                      variables: {
                        input: {
                          id,
                          firstname: values.firstname,
                          lastname: values.lastname,
                          street: [values.street],
                          postcode: values.postcode,
                          city: values.city,
                          countryId: values.countryId,
                          company: values.company,
                          telephone: values.telephone
                        }
                      }
                    }).then(() => history.push('/account/address-book'))
                  }
                >
                  {() => (
                    <Form id={id} i18nId="editAddress" defaultTheme={editAddressFormLayout}>
                      <Box
                        gridArea={AddressFormArea.contact}
                        display="grid"
                        gridGap="sm"
                        css={{ alignContent: 'start' }}
                      >
                        <FormField name="company" />
                        <FormField name="firstname" required />
                        <FormField name="lastname" required />
                        <FormField name="telephone" required />
                      </Box>
                      <Box
                        gridArea={AddressFormArea.address}
                        display="grid"
                        gridGap="sm"
                        css={{ alignContent: 'start' }}
                      >
                        <FormField name="street" required />
                        <FormField name="postcode" required />
                        <FormField name="city" required />
                        <FormField name="countryId" required />
                      </Box>

                      <FlexLayout justifyContent="space-between" alignItems="center" mt="md">
                        <Button type="submit" variant={loading ? 'loader' : undefined}>
                          <T id="editAddress.submitButton" />
                        </Button>
                      </FlexLayout>
                      <FormErrorSummary errors={error && [error.message]} />
                    </Form>
                  )}
                </Formik>
              )}
            </EditAddressMutation>
          </Box>
        );
      }}
    </AddressQuery>
  );
};

export default EditAddress;