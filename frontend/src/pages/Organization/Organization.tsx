import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuthContext } from 'context';
import classes from './styles.module.scss';
import { Organization as OrganizationType, Role } from 'types';
import { FaGlobe, FaNetworkWired, FaClock, FaUsers } from 'react-icons/fa';
import { Column } from 'react-table';
import { Table } from 'components';
import { OrganizationForm } from 'components/OrganizationForm';

interface Errors extends Partial<OrganizationType> {
  global?: string;
}

export const Organization: React.FC = () => {
  const { organizationId } = useParams();
  const { apiGet, apiPut, apiPost } = useAuthContext();
  const [organization, setOrganization] = useState<OrganizationType>();
  const [userRoles, setUserRoles] = useState<Role[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string>('');

  const columns: Column<Role>[] = [
    {
      Header: 'Name',
      accessor: ({ user }) => user.fullName,
      width: 200,
      disableFilters: true,
      id: 'name'
    },
    {
      Header: 'Email',
      accessor: ({ user }) => user.email,
      width: 150,
      minWidth: 150,
      id: 'email',
      disableFilters: true
    },
    {
      Header: 'Status',
      accessor: ({ approved }) => (approved ? 'Member' : 'Pending approval'),
      width: 50,
      minWidth: 50,
      id: 'approved',
      disableFilters: true
    },
    {
      Header: 'Action',
      id: 'action',
      Cell: ({ row }: { row: { index: number } }) =>
        organization?.userRoles[row.index].approved ? (
          <Link
            to="#"
            onClick={() => {
              removeUser(row.index);
            }}
          >
            <p>Remove</p>
          </Link>
        ) : (
          <Link
            to="#"
            onClick={() => {
              approveUser(row.index);
            }}
          >
            <p>Approve</p>
          </Link>
        ),
      disableFilters: true
    }
  ];

  const fetchOrganization = useCallback(async () => {
    try {
      const organization = await apiGet<OrganizationType>(
        `/organizations/${organizationId}`
      );
      setOrganization(organization);
      setUserRoles(organization.userRoles);
    } catch (e) {
      console.error(e);
    }
  }, [organizationId, apiGet, setOrganization]);

  const approveUser = async (user: number) => {
    try {
      await apiPost(
        `/organizations/${organization?.id}/roles/${organization?.userRoles[user].id}/approve`,
        {}
      );
      const copy = userRoles.map((role, id) =>
        id === user ? { ...role, approved: true } : role
      );
      setUserRoles(copy);
    } catch (e) {
      console.error(e);
    }
  };

  const removeUser = async (user: number) => {
    try {
      await apiPost(
        `/organizations/${organization?.id}/roles/${organization?.userRoles[user].id}/remove`,
        {}
      );
      const copy = userRoles.filter((_, ind) => ind !== user);
      setUserRoles(copy);
    } catch (e) {
      console.error(e);
    }
  };

  const updateOrganization = async (body: Object) => {
    try {
      const org = await apiPut('/organizations/' + organization?.id, {
        body
      });
      setOrganization(org);
      setMessage('Organization successfully updated');
    } catch (e) {
      setErrors({
        global:
          e.status === 422
            ? 'Error when submitting organization entry.'
            : e.message ?? e.toString()
      });
      console.error(e);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, [fetchOrganization]);

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        {organization && (
          <>
            <div className={classes.header}>
              <div className={classes.headerDetails}>
                <h1>{organization.name}</h1>
                <div className={classes.headerRow}>
                  <label>
                    <FaNetworkWired />
                    Root Domains
                  </label>
                  <span>{organization.rootDomains.join(', ')}</span>
                </div>

                <div className={classes.headerRow}>
                  <label>
                    <FaGlobe />
                    IP Blocks
                  </label>
                  <span>{organization.ipBlocks.join(', ')}</span>
                </div>

                <div className={classes.headerRow}>
                  <label>
                    <FaClock />
                    Passive Mode
                  </label>
                  <span>{organization.isPassive ? 'Yes' : 'No'}</span>
                </div>

                <div className={classes.headerRow}>
                  <label>
                    <FaUsers />
                    Invite Only
                  </label>
                  <span>{organization.inviteOnly ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
            <h1>Organization Users</h1>
            <Table<Role> columns={columns} data={userRoles} />
            <h2>Update Organization</h2>
            {errors.global && <p className={classes.error}>{errors.global}</p>}
            {message && <p>{message}</p>}
            <OrganizationForm
              onSubmit={updateOrganization}
              organization={organization}
              type="update"
            ></OrganizationForm>
          </>
        )}
      </div>
    </div>
  );
};

export default Organization;