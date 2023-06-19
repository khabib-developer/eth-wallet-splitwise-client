import { useParams } from "react-router-dom";
import { useLayoutEffect, useMemo, useState } from "react";
import { useGroupHook } from "../../hooks/group.hook";
import { Box, Tab, Tabs } from "@mui/material";
import { useAuthStore } from "../../store/auth.store";
import { TabPanel, a11yProps } from "../../common/TabPanel";
import { GroupUsers } from "../Users/groupUsers";

export const Group = () => {
  const { group } = useParams();

  const { user } = useAuthStore();

  const { checkForMember } = useGroupHook();

  useLayoutEffect(() => {
    checkForMember(group!);
  }, [checkForMember, group]);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const currentGroup = useMemo(
    () => user?.groups.find((g) => g.id === +group!),
    []
  );

  return (
    <Box sx={{ padding: "20px 60px" }}>
      <h1>{currentGroup?.name}</h1>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="History" {...a11yProps(0)} />
            <Tab label="Balances" {...a11yProps(1)} />
            <Tab label="Users" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          <GroupUsers users={currentGroup?.users || []} />
        </TabPanel>
      </Box>
    </Box>
  );
};
