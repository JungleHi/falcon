import React from 'react';
import { Formik } from 'formik';
import { T } from '@deity/falcon-i18n';
import { H1, Button, FlexLayout, GridLayout } from '@deity/falcon-ui';
import {
  Form,
  FormField,
  CheckboxFormField,
  FormErrorSummary,
  TwoColumnsLayout,
  TwoColumnsLayoutArea,
  AddAddressMutation,
  CountriesQuery,
  CountrySelector
} from '@deity/falcon-ecommerce-uikit';

const AddAddress = ({ history }) => (
  <GridLayout mb="md" gridGap="md">
    <H1>
      <T id="addAddress.title" />
    </H1>
    <AddAddressMutation>
      {(addAddress, { loading, error }) => (
        <Formik
          initialValues={{
            firstname: undefined,
            lastname: undefined,
            street: undefined,
            postcode: undefined,
            city: undefined,
            countryId: undefined,
            company: undefined,
            telephone: undefined,
            defaultBilling: false,
            defaultShipping: false
          }}
          onSubmit={values =>
            addAddress({
              variables: {
                input: {
                  firstname: values.firstname,
                  lastname: values.lastname,
                  street: [values.street],
                  postcode: values.postcode,
                  city: values.city,
                  countryId: values.countryId,
                  company: values.company,
                  telephone: values.telephone,
                  defaultBilling: values.defaultBilling,
                  defaultShipping: values.defaultShipping
                }
              }
            }).then(() => history.push('/account/address-book'))
          }
        >
          {() => {
            const id = 'add-address';

            return (
              <Form id={id} i18nId="addAddress">
                <CheckboxFormField name="defaultBilling" />
                <CheckboxFormField name="defaultShipping" />
                <TwoColumnsLayout>
                  <GridLayout gridArea={TwoColumnsLayoutArea.left}>
                    <FormField name="company" />
                    <FormField name="firstname" required />
                    <FormField name="lastname" required />
                    <FormField name="telephone" />
                  </GridLayout>
                  <GridLayout gridArea={TwoColumnsLayoutArea.right}>
                    <FormField name="street" required />
                    <FormField name="postcode" required />
                    <FormField name="city" required />
                    <FormField name="countryId" required>
                      {({ form, field }) => (
                        <CountriesQuery passLoading>
                          {({ countries = { items: [] } }) => (
                            <CountrySelector
                              {...field}
                              onChange={x => form.setFieldValue(field.name, x)}
                              items={countries.items}
                            />
                          )}
                        </CountriesQuery>
                      )}
                    </FormField>
                  </GridLayout>
                </TwoColumnsLayout>
                <FlexLayout justifyContent="flex-end" alignItems="center" mt="md">
                  <Button type="submit" variant={loading ? 'loader' : undefined}>
                    <T id="addAddress.submitButton" />
                  </Button>
                </FlexLayout>
                <FormErrorSummary errors={error && [error.message]} />
              </Form>
            );
          }}
        </Formik>
      )}
    </AddAddressMutation>
  </GridLayout>
);

export default AddAddress;