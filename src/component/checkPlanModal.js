import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  PlanList: {
    backgroundColor: "white",
    flex: 1,
    width: "100%",
    alignItems: "center",
    display: "flex",
  },
  planHeader: {
    flex: 1,
    width: "100%",
    backgroundColor: "dodgerblue",
  },
  headerBar: {
    paddingTop: 30,
    marginLeft: 20,
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  title: {
    flex: 2,
    width: "100%",
    paddingLeft: 20,
    justifyContent: "center",
  },
  headerBarText: {
    fontSize: 20,
    color: "white",
  },
  titleText: {
    fontSize: 25,
    color: "white",
  },
  planBody: {
    width: "100%",
    flex: 4,
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  planCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gainsboro",
    marginTop: 25,
    padding: 4,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "gainsboro",
    shadowOffset: { height: 5, width: 10 },
    flexDirection: "row",
  },
  planTitleText: {
    fontSize: 15,
  },
  cardScroll: {
    flex: 1,
    width: "100%",
  },
  message: {
    width: "100%",
    height: "100%",
    marginTop: 50,
  },
  planData: {
    flex: 5,
  },
  planButton: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  planButtonText: {
    fontSize: 8,
    color: "black",
  },
});

export default class CheckPlanModal extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const plans = this.props.plans;
    let allPlans = [];
    if (plans) {
      const upPlans = plans.up ? plans.up : {};
      const bottomPlans = plans.bottom ? plans.bottom : {};
      allPlans = [...upPlans, ...bottomPlans];
      allPlans.sort((a, b) => {
        if (a.start < b.start) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    return (
      <View style={styles.container}>
        <View style={styles.PlanList}>
          <View style={styles.planHeader}>
            <TouchableOpacity
              onPress={() => this.props.back()}
              style={styles.headerBar}
            >
              <Text style={styles.headerBarText}>✕</Text>
            </TouchableOpacity>
            <View style={styles.title}>
              <Text style={styles.titleText}>{this.props.day}</Text>
            </View>
          </View>
          <View style={styles.planBody}>
            <ScrollView
              style={styles.cardScroll}
              showsVerticalScrollIndicator={false}
            >
              {allPlans.length ? (
                allPlans.map((plan, index) => {
                  return (
                    <View key={index} style={styles.planCard}>
                      <View style={styles.planData}>
                        <Text style={styles.planTimeText}>
                          {plan.start}~{plan.end}
                        </Text>
                        <Text style={styles.planTitleText}>{plan.title}</Text>
                      </View>
                      <View style={styles.planButton}>
                        <Text style={styles.planButtonText}>Edit</Text>
                        <Text style={styles.planButtonText}>Delete</Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View style={styles.message}>
                  <Text>まだ予定はありません</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
