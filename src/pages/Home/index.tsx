import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Input,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { api } from "../../services/api";

export type RouteInfo = {
  droneStart: string;
  objectPickup: string;
  deliveryDestination: string;
  time: number;
};

export type Route = {
  path: string[];
  time: number;
};

export default function Home() {
  const [droneStart, setDroneStart] = useState("");
  const [objectPickup, setObjectPickup] = useState("");
  const [deliveryDestination, setDeliveryDestination] = useState("");
  const [currentRoute, setCurrentRoute] = useState<Route | null>();
  const [lastRoutes, setLastRoutes] = useState<RouteInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const calculateFastestRoute = async () => {
    try {
      setLoading(true);
      const { data } = await api.delivery.getBestRoute(
        droneStart,
        objectPickup,
        deliveryDestination
      );

      setCurrentRoute({
        path: data.path,
        time: data.time,
      });
      setLastRoutes([
        ...lastRoutes,
        {
          droneStart,
          objectPickup,
          deliveryDestination,
          time: data.time,
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2">AmazonIA</Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} sm={6} flexDirection="column" display="flex" gap={2}>
          <Box
            flexDirection="row"
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
            gap={2}
          >
            <Typography variant="body1">Drone Start</Typography>
            <Input
              placeholder="Drone Start"
              title="Drone Start"
              sx={{ maxWidth: 140 }}
              value={droneStart}
              onChange={(e) => {
                if (e.target.value.length > 2) return;
                setDroneStart(e.target.value.toUpperCase());
              }}
            />
          </Box>
          <Box
            flexDirection="row"
            display="flex"
            alignItems="baseline"
            gap={2}
            justifyContent="space-between"
          >
            <Typography variant="body1">Object Pickup</Typography>
            <Input
              placeholder="Object Pickup"
              title="Object Pickup"
              value={objectPickup}
              sx={{ maxWidth: 140 }}
              onChange={(e) => {
                if (e.target.value.length > 2) return;
                setObjectPickup(e.target.value.toUpperCase());
              }}
            />
          </Box>

          <Box
            justifyContent="space-between"
            flexDirection="row"
            display="flex"
            alignItems="baseline"
            gap={2}
          >
            <Typography variant="body1">Destination</Typography>
            <Input
              placeholder="Destination"
              title="Destination"
              value={deliveryDestination}
              sx={{ maxWidth: 140 }}
              onChange={(e) => {
                if (e.target.value.length > 2) return;
                setDeliveryDestination(e.target.value.toUpperCase());
              }}
            />
          </Box>

          <Button
            variant="contained"
            placeholder="Calculate Fastest Route!"
            title="Calculate Fastest Route!"
            onClick={calculateFastestRoute}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={25} color="primary" />
            ) : (
              "Calculate Fastest Route!"
            )}
          </Button>

          {currentRoute && (
            <Card>
              <CardContent>
                <Typography variant="body1">
                  The set delivery will have the route{" "}
                  <span style={{ color: "red" }}>
                    {currentRoute.path.join(" -> ")}
                  </span>
                  , and will take{" "}
                  <span style={{ color: "red" }}>
                    {Math.round(currentRoute.time)}
                  </span>{" "}
                  seconds to be delivered as fast as possible
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} sm={6} display="flex" flex={1} flexDirection="row">
          {lastRoutes.length && (
            <List sx={{ width: "100%", maxWidth: 360 }}>
              <Typography variant="h4">Last Deliveries</Typography>
              {lastRoutes.reverse().map((route) => (
                <ListItem alignItems="flex-start">
                  <ListItemText
                    secondary={
                      <Typography variant="body2">
                        From {route.droneStart} to {route.objectPickup} to{" "}
                        {route.deliveryDestination} in {Math.round(route.time)}{" "}
                        seconds.
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
