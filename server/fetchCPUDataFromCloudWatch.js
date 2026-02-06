import AWS from "aws-sdk";

export async function fetchCPUDataFromCloudWatch(
  ipAddress,
  startDate,
  endDate,
  period,
) {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  try {
    const ec2 = new AWS.EC2();
    const instance = await ec2
      .describeInstances({
        Filters: [{ Name: "private-ip-address", Values: [ipAddress] }],
      })
      .promise();
    if (
      !instance.Reservations ||
      instance.Reservations.length === 0 ||
      instance.Reservations[0].Instances.length === 0
    ) {
      return null;
    }
    const instanceId = instance.Reservations[0].Instances[0].InstanceId;
    const cloudwatch = new AWS.CloudWatch();
    const params = {
      Namespace: "AWS/EC2",
      MetricName: "CPUUtilization",
      Dimensions: [
        {
          Name: "InstanceId",
          Value: instanceId,
        },
      ],
      StartTime: new Date(startDate),
      EndTime: new Date(endDate),
      Period: Number(period),
      Statistics: ["Average"],
    };
    const data = await cloudwatch.getMetricStatistics(params).promise();
    console.log("EC2 Instances:", instance.Reservations[0].Instances);
    return {
      instanceId: instanceId,
      data: data.Datapoints.sort((a, b) => a.Timestamp - b.Timestamp),
    };
  } catch (error) {
    console.log("Error describing instances:", error);
  }
}
